import axios from "../../axios/axios"

export const requestPaymentAction = (phone) => async (dispatch) => {
    try {
        dispatch({ type: 'PAYMENT_REQUEST' })

        const { data } = await axios.post('https://armateam.ir/rest/portal/request/', {
            action: 'REQUEST',
            phone: phone
        })

        dispatch({
            type: 'PAYMENT_SUCCESS',
            payload: data
        })
    } catch (error) {
        console.log(error)
    }
}
export const varifyPaymentAction = (phone) => async (dispatch) => {
    try {
        dispatch({ type: 'PAYMENT_REQUEST' })

        const { data } = await axios.post('https://armateam.ir/rest/portal/varify/', {
            action: 'REQUEST',
            phone: phone
        })

        dispatch({
            type: 'PAYMENT_SUCCESS',
            payload: data
        })
    } catch (error) {
        console.log(error)
    }
}