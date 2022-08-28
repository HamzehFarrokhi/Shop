import React from 'react'
import { Link } from 'react-router-dom'
import './Logo.css'
import config from '../../../config'

const Logo = () => {

    const theme = window.localStorage.getItem("theme")

    const logoStyle = {
        width: "30px",
        filter: theme === 'dark' ? "invert(1)" : ""
    }

    return (
        <Link to={`${config.sourceFolder}/`} className="main-logo flex-align">
            <img style={logoStyle} src={`${config.sourceFolder}/img/logo.png`} alt='' />
            <p style={{ color: "var(--primaryColor)" }}>آرما مارکت</p>
        </Link>
    )
}

export default Logo