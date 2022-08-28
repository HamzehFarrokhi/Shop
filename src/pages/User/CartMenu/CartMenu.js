import React, { useContext, useEffect, useState } from 'react'
import { CartContext } from '../../../context/cart-context'
import './CartMenu.css'

const CartMenu = () => {

    const cartContext = useContext(CartContext)
    const [cartNumber, setCartNumber] = useState(0)

    useEffect(() => {
        if (Array.isArray(cartContext.cart)) {
            let findNumber = 0;
            try {
                cartContext.cart.forEach(element => {
                    findNumber += element.number
                });
            } catch { }

            setCartNumber(findNumber)
        }
    }, [cartContext.cart])

    return (
        <div className='cart-icon'>
            <i className="fa-regular fa-shopping-cart"></i>
            {cartNumber !== 0 ? <p className='cart-number'>{cartNumber}</p> : null}
        </div>
    )
}

export default CartMenu