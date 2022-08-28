import React from 'react'
import './Trends.css'

const Trends = ({ trendData, trendProductId, changeTrendProduct }) => {

    const TrendProducts = trendData.map((item) => {
        const className = ((item.id - 1) === trendProductId) ? " trend-product-active" : "";
        return (
            <div
                className={`trend-product${className}`}
                key={item.id}
                onClick={() => changeTrendProduct(item.id)}
            >
                <i className="fa-light fa-mobile"></i>
                <p>{item.name}</p>
            </div>
        )
    })

    return (
        <div className='trends'>
            <div className='trendbox-title flex-align flex-justify-center marg-v-20 descripe-1'>
                <i className="fa-light fa-chart-mixed"></i>
                <p style={{ margin: "0 15px" }}>محصولات پربازدید</p>
            </div>
            {TrendProducts}
        </div>
    )
}

export default Trends