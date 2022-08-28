import React from 'react'
import './Wrapper.css'

const Wrapper = ({ children, className }) => {
    return (
        <div className={`wrapper ${className}`}>{children}</div>
    )
}

export default Wrapper