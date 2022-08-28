import axios from "../../axios/axios"

export const productListAction = (category) => async (dispatch) => {
    try {
        dispatch({ type: 'PRODUCT_LIST_REQUEST' })

        const { data } = await axios.get(`/products/${category}`)

        dispatch({
            type: 'PRODUCT_LIST_SUCCESS',
            payload: data
        })
    } catch (error) {
        console.log(error)
    }
}
export const productFilterListAction = (category, filter) => async (dispatch) => {
    try {
        dispatch({ type: 'PRODUCT_FILTER_REQUEST' })

        const { data } = await axios.get(`/products/${category}/${filter}`)

        dispatch({
            type: 'PRODUCT_FILTER_SUCCESS',
            payload: data
        })
    } catch (error) {
        console.log(error)
    }
}
export const productDetailAction = (id) => async (dispatch) => {
    try {
        dispatch({ type: 'PRODUCT_DETAIL_REQUEST' })

        const { data } = await axios.get(`/product/${id}`)

        dispatch({
            type: 'PRODUCT_DETAIL_SUCCESS',
            payload: data
        })
    } catch (error) {
        console.log(error)
    }
}
export const filterDataAction = (category) => async (dispatch) => {
    try {
        dispatch({ type: 'FILTER_DATA_REQUEST' })

        const { data } = await axios.get(`/filterData/${category}`)

        dispatch({
            type: 'FILTER_DATA_SUCCESS',
            payload: data
        })
    } catch (error) {
        console.log(error)
    }
}