import React from 'react'
import './Rate.css'

const Rate = ({ rate, className, style }) => {
    return (
        <div className={`${className} product-rate flex-align`} style={style}>
            <p className="rate">{rate}</p>
            <i className="fa-solid fa-star-sharp"></i>
        </div>
    )
}

export default Rate