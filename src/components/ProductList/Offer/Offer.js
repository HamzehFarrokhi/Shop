import React from 'react'
import './Offer.css'

const Offer = ({ offerOn }) => {

    return (
        (offerOn) ?
        <div className='offer'>
            <p className='offer-text no-select'>فروش ویژه</p>
        </div> : null
    )
}

export default Offer