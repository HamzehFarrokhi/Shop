import React from 'react'
import './LoadingSpinner.css'

const LoadingSpinner = ({ className }) => {
    return (
        <div className={`loading-spinner ${className}`}><i className="fa-light fa-circle-notch"></i></div>
    )
}

export default LoadingSpinner