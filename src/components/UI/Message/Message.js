import React, { useState } from 'react'
import './Message.css'

const Message = ({ text }) => {

    const [messageClass, setMessageClass] = useState('')

    return (
        <div className={`message-box ${messageClass}`}>
            <p className='message-text'>
                {text}
            </p>
            <i onClick={() => setMessageClass('closeMessage')} className="fa-regular fa-xmark"></i>
        </div >
    )
}

export default Message