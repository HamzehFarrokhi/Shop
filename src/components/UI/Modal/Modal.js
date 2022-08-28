import React from "react";
import Backdrop from "../Backdrop/Backdrop"
import './Modal.css'

const Modal = ({ children, modalShow, modalHandler }) => {
    return (
        <>
            <Backdrop show={modalShow} click={modalHandler} zIndex="99" />
            <div className="modal" style={{
                top: modalShow ? '50%' : '-100%',
                opacity: modalShow ? '1' : '0'
            }}>
                {children}
            </div>
        </>
    )
}

export default Modal