import React, { useContext, useEffect, useState } from 'react'
import { CartContext } from '../../../context/cart-context'
import './CartControls.css'
import LoadingSpinner from '../../UI/LoadingSpinner/LoadingSpinner'

const CartControls = ({ products, productId, className }) => {

    const cartContext = useContext(CartContext)
    const [tedad, setTedad] = useState(0)

    useEffect(() => {
        let newTedad = 0;
        if (Array.isArray(cartContext.cart) && cartContext.cart.length !== 0) {
            const numberIndex = cartContext.cart.findIndex((carts) => carts.id === productId);
            newTedad = (numberIndex !== -1 ? cartContext.cart[numberIndex].number : 0)
        }
        setTedad(newTedad)
    }, [cartContext.cart, productId])

    const addProduct = () => {
        const productIndex = products.findIndex((item) => item.id === productId)
        cartContext.addProduct(productId, products[productIndex])
    }

    const removeProduct = () => {
        const productIndex = products.findIndex((item) => item.id === productId)
        cartContext.removeProduct(productId, products[productIndex])
    }

    return (
        <div className={`product-controls ${className}`}>
            <div className="cart-controls">
                {(cartContext.isLoading.state && cartContext.isLoading.product === productId) ? <LoadingSpinner className="product-loader" /> : <>
                    <div className='flex-align cta' onClick={addProduct}>
                        <i className="fa-solid fa-plus"></i>
                        {tedad > 0 ? null : <p className='title-5 no-select' style={{ marginLeft: "8px" }}>سبد خرید</p>}
                    </div>
                    {tedad > 0 ? <>
                        <p className="tedad no-select">{tedad}</p>
                        <div className='flex-align cta' onClick={removeProduct}>
                            <i className="fa-solid fa-minus"></i>
                        </div>
                    </> : null}
                </>}
            </div>
            <i className="fa-regular fa-heart add-to-favorite"></i>
        </div>
    )
}

export default CartControls