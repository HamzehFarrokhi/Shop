import React from 'react'
import './Show.css'
import CartControls from '../../ProductList/CartControls/CartControls'
import config from '../../../config'

const Show = ({ trendData, trendProductId, showPageId, changeShowPage, children }) => {

    const showDots = trendData[trendProductId].titles.map(item => {
        const dotStyle = item.id === showPageId ? " active-circle" : ""
        return (
            <span key={item.id} className={`show-circle${dotStyle}`}></span>
        )
    })

    const style = {
        backgroundImage: `url(${config.sourceFolder}/img/banner/${trendData[trendProductId].images[showPageId - 1].name}.jpg)`,
        backgroundColor: trendData[trendProductId].images[showPageId - 1].backColor
    }

    return (
        <div className='show' style={style}>
            <div className='show-interact'>
                <h3 className='show-title'>
                    {trendData[trendProductId].titles[showPageId - 1].value}
                </h3>
                <p className='show-describe'>
                    {trendData[trendProductId].des[showPageId - 1].value}
                </p>
                {children}
                <CartControls className='show-cart-control'
                    products={[trendData[trendProductId].productData]}
                    productId={trendData[trendProductId].productData.id}
                />
            </div>
            <div className='show-controls'>
                <div className='show-back-next'>
                    <i onClick={() => changeShowPage("sub")} className="fa-regular fa-angle-left"></i>
                    <i onClick={() => changeShowPage("add")} className="fa-regular fa-angle-right"></i>
                </div>
                <div className='show-dots'>
                    {showDots}
                </div>
            </div>
        </div>
    )
}

export default Show