import React from "react";
import './Backdrop.css'

const Backdrop = ( {show, click, zIndex} ) => {
    return (
        show ? <div className="backdrop" style={{zIndex: zIndex}} onClick={click}></div> : null
    )
}

export default Backdrop