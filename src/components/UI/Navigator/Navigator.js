import React from 'react'
import { useNavigate } from 'react-router-dom'
import './Navigator.css'

const Navigator = ({ link, text, config }) => {

    let navigate = useNavigate()

    return (
        <div
            className='flex-align navigator-design'
            style={config.style}
            onClick={() => navigate(link, { replace: true })}
        >
            {config.hasLi ? <li><p>{text}</p></li> : <p>{text}</p>}
            <i className="fa-regular fa-angle-right"></i>
        </div>
    )
}

export default Navigator