export const userCartReducer = (state = { userCart: {} }, action) => {
    switch (action.type) {
        case 'USER_CART_REQUEST':
            return { cartLoading: true, ...state }
        case 'USER_CART_SUCCESS':
            return { cartLoading: false, userCart: action.payload }
        default:
            return state
    }
}
export const userAddressReducer = (state = { editResponse: {} }, action) => {
    switch (action.type) {
        case 'USER_ADDRESS_REQUEST':
            return { editRquestLoading: true, editResponse: {} }
        case 'USER_ADDRESS_SUCCESS':
            return { editRquestLoading: false, editResponse: action.payload }
        default:
            return state
    }
}