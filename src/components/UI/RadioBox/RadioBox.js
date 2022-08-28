import React from 'react'
import './RadioBox.css'

const RadioBox = ({ id, check, click, label, group }) => {
    return (
        <label className='radio-container flex-align'>
            <input id={id} name={group} type="radio" checked={check} onClick={click} />
            <span className='radio-circle'></span>
            <span className='radio-label'>{label}</span>
        </label>
    )
}

export default RadioBox