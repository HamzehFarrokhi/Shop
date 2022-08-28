import React from 'react'
import './ColorCircles.css'

const ColorCircles = ({ colorData }) => {

    const colorDots = colorData.split(',').map((item) => {
        return (
            <span key={`color-${item}`}
                className="dots"
                style={{ backgroundColor: item }}>
            </span>
        )
    });

    return (
        <div className='color-circles'>
            {colorDots}
        </div>
    )
}

export default ColorCircles