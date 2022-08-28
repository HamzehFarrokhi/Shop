import React from 'react'
import './Price.css'
import Toman from '../../UI/Toman/Toman'

const Price = ({ price, off }) => {

    const priceHandler = () => {
        try {
            const offInt = parseInt(off)
            const priceInt = parseInt(price)
            const result = (offInt - priceInt) / offInt * 100

            return Math.floor(result)
        } catch {
            return 0
        }
    }

    const percent = (off !== '0') ? priceHandler() : 0

    const commaAdder = (price) => {
        try {
            return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, "/")
        } catch {
            return price
        }
    }

    return (
        (off === '0') ?
            <div className="product-price">
                <h3 className="title-5" style={{marginLeft: "10px"}}>قیمت: </h3>
                <h3 className="title-1 font-samim">{commaAdder(price)}</h3>
                <Toman />
            </div> :
            <div className="product-price" style={{marginTop: "-10px"}}>
                <h3 className="title-5">قیمت: </h3>
                <div className='flex-align flex-v'>
                    <h3 className="title-3 font-samim descripe offed-price">{commaAdder(off)}</h3>
                    <div className='flex-align'>
                        <h3 className="title-1 font-samim flex-align">{commaAdder(price)}<Toman /></h3>
                        
                    </div>
                </div>
                <div className='offer-percent'>
                    <p className='font-samim'>%</p>
                    <p className='offer-percent-text'>{percent}</p>
                </div>
            </div>
    )
}

export default Price