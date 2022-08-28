import React, { useState, useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import './ProfileContextMenu.css'

import { AuthContext } from '../../context/auth-context'

const ProfileContextMenu = () => {

    const [askLogout, setIsLogout] = useState(false)

    const authContext = useContext(AuthContext)

    let navigate = useNavigate()
    const navigateProfile = (page) => {
        navigate(page, { replace: true })
    }

    const logoutCheck = (event) => {
        event.stopPropagation()
        setIsLogout(prevState => (!prevState))
    }

    const logOut = () => {
        let theme = window.localStorage.getItem("theme")
        window.localStorage.clear()
        window.localStorage.setItem("theme", theme);
        window.location.reload()
    }

    return (
        <div className='profile-context-menu'>
            <div className='context-menu'>
                <ul>
                    <div className='context-menu-items profile-item' onClick={() => navigateProfile("/user/profile")}>
                        <div>
                            <div className='profile-image'>
                                <i className="fa-regular fa-user"></i>
                            </div>
                            {authContext.userData.data.name}
                        </div>
                        <i className="fa-regular fa-angle-right"></i>
                    </div>
                    <div className='context-menu-items' onClick={() => navigateProfile("/user/orders")}>
                        <i className="fa-regular fa-bag-shopping"></i>
                        <p>سفارش‌ها</p>
                    </div>
                    <div className='context-menu-items' onClick={() => navigateProfile("/user/intrested")}>
                        <i className="fa-regular fa-heart"></i>
                        <p>علاقه‌مندی‌ها</p>
                    </div>
                    <div className='context-menu-items' onClick={() => navigateProfile("/user/comments")}>
                        <i className="fa-regular fa-comment"></i>
                        <p>دیدگاه‌ها</p>
                    </div>
                    <div className={`context-menu-items ${askLogout ? "ask-logout" : ""}`} onClick={(event) => logoutCheck(event)}>
                        <i className="fa-regular fa-arrow-right-to-bracket"></i>
                        {askLogout ? <>
                            <p className='logout-alert'>از حساب خود خارج می‌شوید؟</p>
                            <div className='ask-logout-options'>
                                <i className="fa-light fa-xmark fa-fw"></i>
                                <i className="fa-light fa-check fa-fw" onClick={logOut}></i>
                            </div>
                        </> : <p>خروج از حساب کاربری</p>}
                    </div>
                </ul>
            </div>
        </div>
    )
}

export default ProfileContextMenu