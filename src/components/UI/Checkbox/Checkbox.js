import React from 'react'
import './Checkbox.css'

const Checkbox = ({ id, check, click, label }) => {
    return (
        <label className='checkbox-container flex-align'>
            <input id={id} type="checkbox" defaultChecked={check} onClick={click} />
            <span className='checkmark'></span>
            <span className='checkbox-label'>{label}</span>
        </label>
    )
}

export default Checkbox