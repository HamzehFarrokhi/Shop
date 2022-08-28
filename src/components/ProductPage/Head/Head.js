import React, { useEffect, useState } from 'react'
import './Head.css'
import ColorCircles from '../../UI/ColorCircles/ColorCircles'
import Rate from '../../ProductList/Rate/Rate'
import CartControls from '../../ProductList/CartControls/CartControls'
import Box from '../../UI/Box/Box'
import Toman from '../../UI/Toman/Toman'
import config from '../../../config'

const Head = ({ product }) => {

    const [offPrice, setOffPrice] = useState(0)

    useEffect(() => {
        let newOff = 0
        try {
            newOff = product.off - product.price;
        } catch { }
        setOffPrice(newOff)
    }, [product.off, product.price])

    const imgLocBig = `${config.sourceFolder}/img/products/300/${product.id}.png`
    const imgLocSmall = `${config.sourceFolder}/img/products/75/${product.id}.png`

    const currentColor = (product.length !== 0) ? config.colors[product.colors.split(',')[0]] : "";
    const colorData = (product.length !== 0) ? product.colors : "";

    const commaAdder = (price) => {
        try {
            return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, "/")
        } catch {
            return price
        }
    }

    const offRender = product.off === '0' ? null : <div className='flex-align justify' style={{ justifyContent: "space-between" }}>
        <p className='descripe-2' style={{ color: "var(--primaryTextColor)" }}>سود شما از این خرید</p>
        <div className='flex-align'>
            <p className='font-samim' style={{ color: "var(--primaryTextColor)" }}>{commaAdder(offPrice)}</p>
            <Toman />
        </div>
    </div>

    return (
        <div className='product-page-head'>
            <div className='product-page-images'>
                <img src={imgLocBig} alt={product.name} />
                <div className='image-box'>
                    <img src={imgLocSmall} alt={product.name} />
                    <img src={imgLocSmall} alt={product.name} />
                    <img src={imgLocSmall} alt={product.name} />
                    <img src={imgLocSmall} alt={product.name} />
                </div>
            </div>
            <div className='product-info-panel'>
                <div className='product-short-data'>
                    <h3 style={{ color: 'var(--color2)' }}>{product.name}</h3>
                    <p className='flex-align marg-v-20'>
                        {config.brands[product.brand].icon}
                        <span className='descripe-4'>برند:&nbsp;</span>
                        <span className='title-2'>{config.brands[product.brand].fa}</span>
                    </p>
                    <div className='flex-align marg-v-20'>
                        <span style={{ whiteSpace: 'nowrap', marginLeft: '15px' }} className='descripe-4'>امتیاز کاربران: </span>
                        <Rate rate={product.rate} />
                    </div>
                    <div className='colors marg-v-20'>
                        <p>
                            <span className='descripe-4'>رنگ: </span>
                            <span className='title-2'>{currentColor}</span>
                        </p>
                        <ColorCircles colorData={colorData} />
                    </div>
                </div>
            </div>
            <Box className="product-price-panel" headConfig={{ exist: false }}>
                <p className='pad-10 title-2' style={{ borderBottom: "1px solid var(--border)", paddingRight: "15px" }}>اطلاعات فروشنده</p>
                <div className='pad-20'>
                    <div className='flex-align marg-b-20' style={{ justifyContent: "space-between" }}>
                        <p className='descripe-2'>قیمت کالا</p>
                        <div className='flex-align'>
                            <p className='font-samim'>{commaAdder(product.price)}</p>
                            <Toman />
                        </div>
                    </div>
                    {offRender}
                    <div className='flex-align' style={{ justifyContent: "space-between", marginTop: "50px" }}>
                        <p className='title-2'>قیمت</p>
                        <div className='flex-align'>
                            <p className='font-samim' style={{ fontSize: "1.2rem" }}>{commaAdder(product.price)}</p>
                            <Toman />
                        </div>
                    </div>
                </div>
                <CartControls className='product-page-cart-control' products={[product]} productId={product.id} />
            </Box>
            <div className='fixed-box flex-align cart-menu-mobile' style={{ justifyContent: "space-between" }}>
                <div>
                    <p className='title-6 pad-h-20' style={{ color: "var(--primaryTextColor)" }}>جمع سبد خرید:</p>
                    <div className='flex-align flex-gap-10'>
                        <p className='font-samim title-2' style={{ fontSize: "1.2rem", marginRight: "20px" }}>{commaAdder(product.price)}</p>
                        <Toman />
                    </div>
                </div>
                <CartControls className='product-page-cart-control' products={[product]} productId={product.id} />
            </div>
        </div >
    )
}

export default Head