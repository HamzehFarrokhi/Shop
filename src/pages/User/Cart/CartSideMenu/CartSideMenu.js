import React, { useContext, useEffect, useState } from 'react'
import './CartSideMenu.css'
import Box from '../../../../components/UI/Box/Box'
import { CartContext } from '../../../../context/cart-context'
import Button from '../../../../components/UI/Button/Button'
import Toman from '../../../../components/UI/Toman/Toman'

const CartSideMenu = () => {

    const cartContext = useContext(CartContext)
    const [offPrice, setOffPrice] = useState(0)

    useEffect(() => {
        let newOff = 0
        try {
            newOff = cartContext.totalOff - cartContext.totalPrice;
        } catch { }
        setOffPrice(newOff)
    }, [cartContext.totalOff, cartContext.totalPrice])

    const commaAdder = (price) => {
        try {
            return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, "/")
        } catch {
            return price
        }
    }

    const offRender = offPrice === 0 ? null : <div className='flex-align justify' style={{ justifyContent: "space-between" }}>
        <p className='descripe-2' style={{ color: "var(--primaryTextColor)" }}>سود شما از این خرید</p>
        <div className='flex-align'>
            <p className='font-samim' style={{ color: "var(--primaryTextColor)" }}>{commaAdder(offPrice)}</p>
            <Toman />
        </div>
    </div>

    return (
        <>
            <Box className="cart-side-menu" headConfig={{ exist: false }}>
                <p className='pad-10 title-2' style={{ borderBottom: "1px solid var(--border)", paddingRight: "15px" }}>اطلاعات سبد</p>
                <div className='pad-20'>
                    <div className='flex-align marg-b-20' style={{ justifyContent: "space-between" }}>
                        <p className='descripe-2'>قیمت همه کالاها</p>
                        <div className='flex-align'>
                            <p className='font-samim'>{commaAdder(cartContext.totalOff)}</p>
                            <Toman />
                        </div>
                    </div>
                    {offRender}
                    <div className='flex-align' style={{ justifyContent: "space-between", marginTop: "50px" }}>
                        <p className='title-2'>جمع سبد خرید</p>
                        <div className='flex-align'>
                            <p className='font-samim' style={{ fontSize: "1.2rem" }}>{commaAdder(cartContext.totalPrice)}</p>
                            <Toman />
                        </div>
                    </div>
                </div>
                <Button click={() => window.open('/checkout/shipping')} btnType="enter stick-to-bottom marg-h-10 cart-side-cta" style={{ width: "calc(100% - 20px)" }}>
                    ادامه فرایند خرید
                </Button>
            </Box>
            <div className='fixed-box flex-align cart-menu-mobile' style={{ justifyContent: "space-between" }}>
                <div>
                    <p className='title-2 pad-h-20' style={{ color: "var(--primaryTextColor)" }}>جمع سبد خرید:</p>
                    <div className='flex-align flex-gap-10'>
                        <p className='font-samim title-1' style={{ fontSize: "1.6rem", marginRight: "20px" }}>{commaAdder(cartContext.totalPrice)}</p>
                        <Toman />
                    </div>
                </div>
                <Button click={() => window.open('/checkout/shipping')} btnType="enter w-50">
                    ادامه فرآیند خرید
                </Button>
            </div>
        </>
    )
}

export default CartSideMenu