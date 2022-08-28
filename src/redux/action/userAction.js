import axios from "../../axios/axios"
export const userCartAction = (username) => async (dispatch) => {
    try {
        dispatch({ type: 'USER_CART_REQUEST' })

        const { data } = await axios.post('https://armateam.ir/rest/shop/authenticate/', {
            action: 'USER_CART',
            username: username
        })

        dispatch({
            type: 'USER_CART_SUCCESS',
            payload: data
        })
    } catch (error) {
        console.log(error)
    }
}
export const userAddressAction = (phone, token, address) => async (dispatch) => {
    try {
        dispatch({ type: 'USER_ADDRESS_REQUEST' })

        const { data } = await axios.post('https://armateam.ir/rest/shop/edit/', {
            action: 'ADDRESS_EDIT',
            phone: phone,
            token: token,
            address: address
        })

        dispatch({
            type: 'USER_ADDRESS_SUCCESS',
            payload: data
        })
    } catch (error) {
        console.log(error)
    }
}