import React from 'react'
import './Category.css'
import categoryData from './categoryData'
import { Link } from 'react-router-dom'
import config from '../../config'

const Category = ({ children }) => {

    return (
        <div className="product-category">
            <h3>دسته‌بندی محصولات</h3>
            <div className='category-list'>
                {categoryData.map((item) => {
                    return (
                        <Link to={`/shopping/${item.image}`} target='_blank' key={item.id}>
                            <div className='category-item'>
                                <span className='category-background'></span>
                                <div className='category-image'>
                                    <img
                                        src={`${config.sourceFolder}/img/category/${item.image}.png`}
                                        alt={item.title}
                                    />
                                </div>
                                <p>{item.title}</p>
                            </div>
                        </Link>
                    )
                })}
            </div>
            {children}
        </div>
    )
}

export default Category