import React from "react";
import { Link } from "react-router-dom";

import './Product.css'
import Rate from "../Rate/Rate";
import Offer from "../Offer/Offer";
import Price from "../Price/Price";
import config from "../../../config";

const Product = ({ productData, children }) => {

    return (
        <div className="product">
            <Offer offerOn={(productData.off !== '0') ? true : false} />
            <Link target="_blank" to={`${config.sourceFolder}/product/${productData.id}`}>
                <img alt={productData.name} className="product-image" src={`${config.sourceFolder}/img/products/300/${productData.id}.png`} />
            </Link>
            <div className="product-colors">
                {productData.colors.split(',').map((item) => {
                    return <span key={`${productData.id}-${item}`} className="color-dots" style={{ backgroundColor: item }}></span>
                })}
            </div>
            <Rate rate={productData.rate} style={{justifyContent: "flex-end"}}/>
            <Link to={`${config.sourceFolder}/product/${productData.id}`} target="_blank">
                <div className="product-title">{productData.name}</div>
            </Link>
            {children}
            <Price price={productData.price} off={productData.off} />
        </div>
    )
}

export default Product