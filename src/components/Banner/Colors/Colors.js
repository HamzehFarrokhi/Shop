import React from 'react'
import './Colors.css'

const Colors = ({ trendData, trendProductId, changeColor }) => {
    return (
        <div className='show-colors'>
            {
                trendData[trendProductId].colors.map((item) => {
                    const activeStyle = item.selected ? " active-color" : ""
                    return (
                        <div className='show-color' key={`color-${item.id}`} onClick={() => changeColor(item.id)}>
                            <span key={item.id} className={`show-color-circle${activeStyle}`} style={{ backgroundColor: item.value }}></span>
                            <p className='show-color-text'>{item.text}</p>
                        </div>
                    )
                })
            }
        </div>
    )
}

export default Colors