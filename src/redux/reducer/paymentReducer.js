export const requestPaymentReducer = (state = { requestResponse: {} }, action) => {
    switch (action.type) {
        case 'PAYMENT_REQUEST':
            return { requestLoading: true, ...state }
        case 'PAYMENT_SUCCESS':
            return { requestLoading: false, requestResponse: action.payload }
        default:
            return state
    }
}