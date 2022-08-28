import React, { useState, useEffect } from 'react'
import './NotFound.css'

const NotFound = ({ text, desc }) => {

    const [picPath, setPicPath] = useState('')
    const theme = window.localStorage.getItem("theme")

    useEffect(() => {
        let path = theme === 'dark' ? 'not-found-dark.png' : 'not-found-light.gif'
        setPicPath(<img src={`${process.env.PUBLIC_URL}/img/products/${path}?${Date.now()}`} alt='no-product' />)
    }, [theme])

    return (
        <div className='not-found'>
            {picPath}
            <div className='not-found-flex'>
                <i className="fa-regular fa-circle-info"></i>
                <div className='not-found-message'>
                    <p>{text}</p>
                    <p>{desc}</p>
                </div>
            </div>
        </div>
    )
}

export default NotFound