import React from 'react'
import './LoadingCard.css'

const LoadingCard = () => {
    return (
        <div className='loading-card'>
            <div className='loading-image loader-box'></div>
            <div className='loading-rate loader-box'></div>
            <div className='loading-title loader-box'></div>
            <div className='loading-controls loader-box'>
                {/* <div className='loader-box'></div>
                <div className='loader-box'></div> */}
            </div>
            <div className='loading-price loader-box'></div>
            <div className='loading-color loader-box'></div>
        </div>
    )
}

export default LoadingCard