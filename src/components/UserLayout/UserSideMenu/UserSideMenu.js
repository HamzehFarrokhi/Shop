import React, { useState, useContext } from 'react'
import { useNavigate } from "react-router-dom";
import { AuthContext } from '../../../context/auth-context';

import './UserSideMenu.css'
import Box from '../../UI/Box/Box'
import Navigator from '../../UI/Navigator/Navigator';

const UserSideMenu = () => {

    const authContext = useContext(AuthContext)

    const [askLogout, setAskLogout] = useState(false)
    const [activeSideMenu, setActiveSideMenu] = useState(false)

    let navigate = useNavigate()

    const logOut = () => {
        let theme = window.localStorage.getItem("theme")
        window.localStorage.clear()
        window.localStorage.setItem("theme", theme);
        navigate(`/`, { replace: true })
        setTimeout(() => {
            window.location.reload()
        }, 100);
    }

    const menuList = [
        { title: "خلاصه فعالیت‌ها", icon: "fa-regular fa-house", link: "profile", page: "profile" },
        { title: "سفارش‌ها", icon: "fa-regular fa-bag-shopping", link: "orders", page: "order" },
        { title: "علاقه‌مندی‌ها", icon: "fa-regular fa-heart", link: "intrested", page: "intrested" },
        { title: "دیدگاه‌ها", icon: "fa-regular fa-comment", link: "comments", page: "comments" },
        { title: "آدرس‌ها", icon: "fa-regular fa-location-dot", link: "address", page: "address" },
        { title: "حساب‌ها", icon: "fa-regular fa-credit-card", link: "cards", page: "cards" },
        { title: "پیغام‌ها", icon: "fa-regular fa-bell", link: "messages", page: "messages" },
        { title: "ویرایش اطلاعات حساب", icon: "fa-regular fa-user-pen", link: "edit", page: "edit" }
    ]

    return (
        <>
            <Box className={`user-side-menu ${activeSideMenu ? 'active' : ''}`} headConfig={{ exist: false }}>
                <div className="side-menu-data pad-v-20">
                    <div className='user-data flex-align'>
                        <i className="fa-regular fa-user"></i>
                        <div>
                            <p className='title-2'>{authContext.isLoading ? null : authContext.userData.data.name}</p>
                            <p className='font-samim descripe'>{authContext.isLoading ? null : authContext.userData.data.phone}</p>
                        </div>
                    </div>
                    <ul>
                        <Navigator
                            text="تغییر رمز عبور"
                            link="/forget-password"
                            config={{ hasLi: true, style: { paddingTop: "16px", marginRight: "35px" } }}
                        />
                        {authContext.isLoading ? null : (authContext.userData.data.varified === "1" ? null : <Navigator
                            text="تکمیل اطلاعات کاربری"
                            link="/user/edit"
                            config={{ hasLi: true, style: { marginRight: "35px" } }}
                        />)}
                    </ul>
                </div>
                <nav>
                    <ul className='side-menu-list'>
                        {menuList.map((item) => {
                            let isPage = window.location.pathname.includes(item.page)

                            const navigator = (link) => {
                                setActiveSideMenu(false)
                                navigate(`/user/${link}`, { replace: true })
                            }

                            return (
                                <div key={item.title} onClick={() => navigator(item.link)}>
                                    <span className={`${isPage ? "side-menu-active-div" : ""}`}></span>
                                    <li>
                                        <i className={`${item.icon} fa-fw`}></i>
                                        <p className={`${isPage ? "side-menu-active-text" : ""}`}>{item.title}</p>
                                    </li>
                                </div>
                            )
                        })}
                        <div onClick={() => setAskLogout(!askLogout)}>
                            {askLogout ? <div className='side-menu-ask-logout'>
                                <p>خروج از حساب؟</p>
                                <i className="fa-regular fa-check fa-fw" onClick={logOut}></i>
                                <i className="fa-regular fa-xmark fa-fw"></i>
                            </div> : <li>
                                <i className="fa-regular fa-arrow-right-from-bracket fa-fw"></i>
                                <p>خروج</p>
                            </li>}
                        </div>
                    </ul>
                </nav>
            </Box>
            <div className="side-menu-button" onClick={() => setActiveSideMenu(!activeSideMenu)}>
                <i className={`fa-regular ${activeSideMenu ? 'fa-xmark' : 'fa-bars'}`}></i>
            </div>
        </>
    )
}

export default UserSideMenu