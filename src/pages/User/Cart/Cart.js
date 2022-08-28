import React, { useContext } from 'react'
import { CartContext } from '../../../context/cart-context'
import { Link } from 'react-router-dom'
import './Cart.css'
import Box from '../../../components/UI/Box/Box'
import config from '../../../config'
import CartControl from '../../../components/ProductList/CartControls/CartControls'
import Rate from '../../../components/ProductList/Rate/Rate'
import Price from '../../../components/ProductList/Price/Price'
import NotFound from '../../../components/UI/NotFound/NotFound'
import CartSideMenu from './CartSideMenu/CartSideMenu'

const Cart = () => {

    const cartContext = useContext(CartContext)

    return (
        <>
            <div className='tabs-control'>

            </div>
            <div className="cart-page">
                <Box className="w-100 cart-box" headConfig={{ exist: false }}>
                    <p className='title-2 pad-20'>سبد خرید شما</p>
                    <div className='flex-align flex-wrap flex-gap-10 cart-list'>
                        {(cartContext.cart !== undefined && Array.isArray(cartContext.cart)) ?
                            (cartContext.cart.length !== 0 ? cartContext.cart.map((item) => {
                                return (
                                    <div className='cart-list-products flex-align pad-20 border-ddd' key={item.id}>
                                        <div className='flex-align flex-v'>
                                            <Link target="_blank" to={`/product/${item.id}`}>
                                                <img
                                                    style={{ width: "120px" }}
                                                    className='marg-v-20 cursor-pointer'
                                                    src={`${config.sourceFolder}/img/products/300/${item.id}.png`}
                                                    alt={item.productName} />
                                            </Link>
                                            <CartControl productId={item.id} products={cartContext.cart} />
                                        </div>
                                        <div style={{ paddingRight: "10px" }} >
                                            <Link target="_blank" to={`/product/${item.id}`}>
                                                <p className='title-2 clamp-text-3'>{item.productName}</p>
                                            </Link>
                                            <Rate rate={item.rate} className='pad-v-10' />
                                            <div className='flex-align flex-gap-10 marg-b-10'>
                                                <span className='color-circle' style={{ backgroundColor: item.color }}></span>
                                                <p className='descripe-2'>{config.colors[item.color]}</p>
                                            </div>
                                            <p className='descripe-2'>موجود در انبار</p>
                                            <Price price={item.productPrice} off={item.productOff} />
                                        </div>
                                    </div>
                                )
                            }) : <NotFound text="سبد خرید خالی است!" desc="می‌توانید در فروشگاه محصولات را به سبد خرید اضافه کنید." />) : <p>AAA</p>}
                    </div>
                </Box>
                <CartSideMenu />
            </div>
        </>
    )
}

export default Cart