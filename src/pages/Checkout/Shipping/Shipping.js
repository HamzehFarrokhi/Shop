import React, { useEffect, useContext } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { requestPaymentAction } from '../../../redux/action/paymentAction'
import { AuthContext } from '../../../context/auth-context'
import { CartContext } from '../../../context/cart-context'
import useTheme from '../../../hooks/theme'
import Logo from '../../../components/UI/Logo/Logo'
import Button from '../../../components/UI/Button/Button'
import Toman from '../../../components/UI/Toman/Toman'
import NotFound from '../../../components/UI/NotFound/NotFound'
import LoadingSpinner from '../../../components/UI/LoadingSpinner/LoadingSpinner'
import AddressList from '../../../components/AddressList/AddressList'
import config from '../../../config'
import './Shipping.css'

const Shipping = () => {

    const [,] = useTheme()
    const authContext = useContext(AuthContext)
    const cartContext = useContext(CartContext)

    const dispatch = useDispatch()
    const requestData = useSelector((state) => state.userPaymentRequest)
    const { requestResponse } = requestData

    useEffect(() => {
        if (requestResponse.status === 200 && requestResponse.auth !== undefined) {
            window.open(`https://www.zarinpal.com/pg/StartPay/${requestResponse.auth}`)
        }
    }, [requestResponse])


    useEffect(() => {
        const user_data = JSON.parse(window.localStorage.getItem("user_data"))
        if (user_data !== null) {
            if (user_data.phone.length === 11) {
                authContext.sign({ userName: user_data.phone })
            }
        }
    }, [])

    const requestPaymentHandler = () => {
        const phone = authContext.userData.data.phone
        if (phone.length === 11) {
            dispatch(requestPaymentAction(phone))
        }
    }

    const commaAdder = (price) => {
        try {
            return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")
        } catch {
            return price
        }
    }

    return (
        <div className='shipping-page'>
            <div className='shipping-top'>
                <div className='shipping-logo'>
                    <Logo />
                </div>
                <div className='shipping-steps'>
                    <div>
                        <div className='step'>
                            <i className="fa-regular fa-cart-shopping-fast"></i>
                            <p className='no-select'>سبد خرید</p>
                        </div>
                    </div>
                    <div className='line'></div>
                    <div>
                        <div className='step active-step'>
                            <i className="fa-regular fa-truck-fast"></i>
                            <p className='no-select'>زمان و نحوه ارسال</p>
                        </div>
                    </div>
                    <div className='line'></div>
                    <div>
                        <div className='step'>
                            <i className="fa-regular fa-wallet"></i>
                            <p className='no-select'>پرداخت</p>
                        </div>
                    </div>
                </div>
            </div>
            <div className='shipping-panel'>
                {(authContext.isAuth) ? <>
                    <div className='shipping-price'>
                        <div className='flex-align'>
                            <p className='title-2'>جمع پرداختی:	&nbsp;</p>
                            <p className='font-samim title-1' style={{ fontSize: '1.4rem', letterSpacing: '2px', marginLeft: '10px', color: 'var(--purple)' }}>{commaAdder(cartContext.totalPrice)}</p>
                            <Toman />
                        </div>
                        <Button btnType="enter" click={requestPaymentHandler}>پرداخت</Button>
                    </div>
                    <p className='title-1 marg-v-10'>سبد خرید</p>
                    <div className='shipping-cart'>
                        {(cartContext.cart !== undefined && Array.isArray(cartContext.cart)) ?
                            (cartContext.cart.length !== 0 ? cartContext.cart.map((item) => {
                                return (
                                    <div className='shipping-products' key={item.id}>
                                        <Link target="_blank" to={`/product/${item.id}`}>
                                            <img
                                                style={{ width: "75px" }}
                                                className='marg-v-20 cursor-pointer'
                                                src={`${config.sourceFolder}/img/products/75/${item.id}.png`}
                                                alt={item.productName} />
                                        </Link>
                                        <p className='tedad font-samim'>{item.number}</p>
                                    </div>
                                )
                            }) : <NotFound text="سبد خرید خالی است!" desc="می‌توانید در فروشگاه محصولات را به سبد خرید اضافه کنید." />) : <LoadingSpinner className="big-spinner" />}
                    </div>
                    <p className='title-1 marg-v-10'>آدرس تحویل سفارش</p>
                    <div>
                        <AddressList />
                    </div>
                    {/* <p className='title-1 marg-v-10'>زمان تحویل سفارش</p>
                    <div>
                        <div>
                            <p>شنبه</p>
                        </div>
                    </div> */}
                </> : null}
            </div>
        </div>
    )
}

export default Shipping