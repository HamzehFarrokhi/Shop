import React, { useState, useEffect, useContext } from "react";
import { useDispatch, useSelector } from "react-redux";
import { userCartAction } from "../redux/action/userAction";

import { AuthContext } from "./auth-context";
import axios from '../axios/axios'

export const CartContext = React.createContext({
    cart: [],
    orders: [],
    isLoading: { product: 0, state: false },
    totalPrice: 0,
    totalOff: 0,
    status: 0,
    addProduct: () => { },
    removeProduct: () => { },
    serverHandler: () => { },
    setCart: () => { }
})

const CartContextProvider = (props) => {
    const [cart, setCart] = useState([])
    const [orders, setOrders] = useState([])
    const [totalPrice, setTotalPrice] = useState(0)
    const [totalOff, setTotalOff] = useState(0)
    const [isLoading, setIsLoading] = useState({ product: 0, state: false })
    const [status, setStatus] = useState(0)

    const authContext = useContext(AuthContext)

    const userCartData = useSelector((state) => state.userCartData)
    const { userCart } = userCartData

    const checkToken = async (cart, token) => {
        await axios.post('https://armateam.ir/rest/shop/token/', {
            action: 'CART_CHECK',
            token: token,
            cart: cart
        })
            .then((response) => {
                if (response.data.status === 200) {
                    setCart(cart)
                }
            })
            .catch((error) => {
                console.log(error);
            });
    }

    let dispatch = useDispatch()
    useEffect(() => {
        if (authContext.userData.data.status === 200) {
            const user_data = JSON.parse(window.localStorage.getItem("user_data"))
            if (user_data !== null) {
                if (user_data.phone.length === 11) {
                    dispatch(userCartAction(user_data.phone))
                }
            }
        } else {
            const user_data = JSON.parse(window.localStorage.getItem("temp_user_data"))
            if (user_data !== null) {
                if (user_data.cart !== null && user_data.cart !== undefined) {
                    checkToken(user_data.cart, user_data.username)
                }
            }
        }
    }, [dispatch, authContext.userData])

    useEffect(() => {
        let tempCart = []
        const user_data = JSON.parse(window.localStorage.getItem("temp_user_data"))
        if (user_data !== null) {
            if (user_data.cart !== null && user_data.cart !== undefined) {
                tempCart = [...user_data.cart]
            }
        }

        if (userCart.status === 200) {
            let newCart = userCart.cart !== undefined ? JSON.parse(userCart.cart) : []
            let newPrice = userCart.cart !== undefined ? userCart.totalPrice : 0
            let newOff = userCart.cart !== undefined ? userCart.totalOff : 0
            let newOrder = userCart.orders !== undefined ? userCart.orders : []


            setOrders(newOrder)
            if (tempCart.length !== 0) {
                let appendedCart = [...newCart]
                tempCart.forEach(temps => {
                    const productIndex = appendedCart.findIndex(item => item.id === temps.id)
                    if (productIndex === -1) {
                        appendedCart.push(temps)
                    } else {
                        appendedCart[productIndex].number += temps.number
                    }
                });

                let priceSum = 0, offSum = 0;
                appendedCart.forEach(element => {
                    try {
                        let productPrice = parseInt(element.productPrice)
                        let productOff = parseInt(element.productOff)
                        productOff = productOff === 0 ? productPrice : productOff
                        let count = element.number
                        if (Number.isInteger(productPrice) && Number.isInteger(count)) {
                            priceSum += productPrice * count;
                            offSum += productOff * count;
                        }
                    }
                    catch { }
                });

                setCart(appendedCart)
                setTotalPrice(priceSum)
                setTotalOff(offSum)
                window.localStorage.removeItem("temp_user_data")
                serverHandler(0, { main: authContext.userData.data.phone, token: user_data.username }, appendedCart, priceSum, offSum, 'CART_TEMP')
            } else {
                setCart(newCart)
                setTotalPrice(newPrice)
                setTotalOff(newOff)
            }
        } else {
            setCart(tempCart)
        }
    }, [userCart, authContext.userData.data.phone])

    const serverHandler = async (id, username, cart, totalPrice, totalOff, action) => {
        setIsLoading({ product: id, state: true })

        await axios.post('https://armateam.ir/rest/shop/cart/', {
            action: action,
            username: username,
            cart: cart,
            totalPrice: totalPrice,
            totalOff: totalOff
        })
            .then((response) => {
                setStatus(response.data.status)
                setIsLoading({ product: 0, state: false })
            })
            .catch((error) => {
                setStatus(404)
                setIsLoading({ product: 0, state: false })
                console.log(error);
            });
    }

    const localStorageHandler = (id, cart, totalPrice, totalOff) => {
        let username = Math.random().toString(16).slice(2, 13);
        const user_data = JSON.parse(window.localStorage.getItem("temp_user_data"))
        if (user_data !== null) {
            if (user_data.username !== null && user_data.username !== undefined) {
                username = user_data.username
            }
        }

        const data = {
            username: username,
            cart: cart,
            totalPrice: totalPrice,
            totalOff: totalOff
        }

        window.localStorage.setItem("temp_user_data", JSON.stringify(data))

        serverHandler(id, username, cart, totalPrice, totalOff, 'CART_UPDATE')
    }

    const addProduct = (id, product) => {
        const cartIndex = cart.findIndex((item) => item.id === id)

        let newCart = [];
        if (cartIndex !== -1) {
            newCart = [...cart];
            newCart[cartIndex].number += 1;
        }
        else {
            const newProduct = {
                id: id,
                productName: product.name,
                productPrice: product.price,
                productOff: product.off,
                number: 1,
                rate: product.rate,
                color: product.colors.split(',')[0]
            }
            newCart = [...cart, newProduct]
        }
        setCart(newCart)

        let priceSum = 0, offSum = 0;
        newCart.forEach(element => {
            try {
                let productPrice = parseInt(element.productPrice)
                let productOff = parseInt(element.productOff)
                productOff = productOff === 0 ? productPrice : productOff
                let count = element.number
                if (Number.isInteger(productPrice) && Number.isInteger(count)) {
                    priceSum += productPrice * count;
                    offSum += productOff * count;
                }
            }
            catch { }
        });

        setTotalPrice(priceSum)
        setTotalOff(offSum)

        if (authContext.userData.data.status === 200) {
            serverHandler(id, authContext.userData.data.phone, newCart, priceSum, offSum, 'CART_UPDATE')
        }
        else {
            localStorageHandler(id, newCart, priceSum, offSum)
        }
    }

    const removeProduct = (id) => {
        const cartIndex = cart.findIndex((item) => item.id === id)
        if (cartIndex !== -1) {
            let newCart = [...cart];
            newCart[cartIndex].number -= 1;
            if (newCart[cartIndex].number === 0)
                newCart.splice(cartIndex, 1)
            setCart(newCart)

            let priceSum = 0, offSum = 0;
            newCart.forEach(element => {
                try {
                    let productPrice = parseInt(element.productPrice)
                    let productOff = parseInt(element.productOff)
                    productOff = productOff === 0 ? productPrice : productOff
                    let count = element.number
                    if (Number.isInteger(productPrice) && Number.isInteger(count)) {
                        priceSum += productPrice * count;
                        offSum += productOff * count;
                    }
                }
                catch { }
            });

            setTotalPrice(priceSum)
            setTotalOff(offSum)

            if (authContext.userData.data.status === 200) {
                serverHandler(id, authContext.userData.data.phone, newCart, priceSum, offSum, 'CART_UPDATE')
            }
            else {
                localStorageHandler(id, newCart, priceSum, offSum)
            }
        }
    }

    return (
        <CartContext.Provider
            value={{
                cart: cart,
                orders: orders,
                isLoading: isLoading,
                totalPrice: totalPrice,
                totalOff: totalOff,
                status: status,
                addProduct: addProduct,
                removeProduct: removeProduct,
                serverHandler: serverHandler,
                setCart: setCart
            }}
        >
            {props.children}
        </CartContext.Provider>
    )
}

export default CartContextProvider