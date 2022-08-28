import { configureStore, combineReducers, applyMiddleware } from '@reduxjs/toolkit';
import thunk from 'redux-thunk';

import { ProductListReducer, ProductFilterListReducer, ProductDetailReducer, FilterDataReducer } from './reducer/productReducer';
import { userCartReducer, userAddressReducer } from './reducer/userReducer';
import { requestPaymentReducer } from './reducer/paymentReducer';

const reducer = combineReducers({
    filterData: FilterDataReducer,
    productList: ProductListReducer,
    productFilter: ProductFilterListReducer,
    productDetail: ProductDetailReducer,
    userCartData: userCartReducer,
    setUserAddress: userAddressReducer,
    userPaymentRequest: requestPaymentReducer
})

const initialState = {}

const middleware = [thunk]

const store = configureStore({ reducer }, initialState, applyMiddleware(...middleware))

export default store