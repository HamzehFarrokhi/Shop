import React, { useState } from "react";
import './Input.css'

const Input = React.forwardRef((props, ref) => {

    const inputClass = ['input-element']
    const [eyeOn, setEyeOn] = useState(false)

    const [inputType, setInputType] = useState(props.config.type)

    if (!props.config.valid && props.config.used) {
        inputClass.push('invalid')
    }

    const eyeHandler = () => {
        setEyeOn(!eyeOn)
        if (eyeOn) {
            setInputType("password")
        }
        else {
            setInputType("text")
        }
    }

    const cheshmi = props.config.type === "password" ? <div className="cheshmi" onClick={eyeHandler}>
        <i className={`fa-solid fa-eye${eyeOn ? "-slash" : ""}`}></i>
    </div> : null

    return (
        <div className={`input ${props.myclass}`}>
            <label className="input-label">{props.config.placeholder}</label>
            <div>
                <input
                    type={inputType}
                    placeholder=""
                    value={props.config.value}
                    className={inputClass.join(' ')}
                    ref={ref}
                    {...props}
                />
                {cheshmi}
            </div>
        </div>
    )
})

export default Input