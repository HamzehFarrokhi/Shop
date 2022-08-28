import React from "react";
import './Button.css'

const Button = ({ btnType, click, children, style }) => {
    return (
        <button className={`btn ${btnType}`} onClick={click} style={style}>
            {children}
        </button>
    )
}

export default Button