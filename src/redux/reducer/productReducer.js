export const ProductListReducer = (state = { products: [] }, action) => {
    switch (action.type) {
        case 'PRODUCT_LIST_REQUEST':
            return { productLoading: true, products: [] }
        case 'PRODUCT_LIST_SUCCESS':
            return { productLoading: false, products: action.payload }
        default:
            return state
    }
}
export const ProductFilterListReducer = (state = { products: [] }, action) => {
    switch (action.type) {
        case 'PRODUCT_FILTER_REQUEST':
            return { productLoading: true, products: [] }
        case 'PRODUCT_FILTER_SUCCESS':
            return { productLoading: false, products: action.payload }
        default:
            return state
    }
}
export const ProductDetailReducer = (state = { product: {} }, action) => {
    switch (action.type) {
        case 'PRODUCT_DETAIL_REQUEST':
            return { loading: true, ...state }
        case 'PRODUCT_DETAIL_SUCCESS':
            return { loading: false, product: action.payload }
        default:
            return state
    }
}
export const FilterDataReducer = (state = { filterData: {} }, action) => {
    switch (action.type) {
        case 'FILTER_DATA_REQUEST':
            return { loading: true, ...state }
        case 'FILTER_DATA_SUCCESS':
            return { loading: false, filterData: action.payload }
        default:
            return state
    }
}