import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../../context/auth-context";

import Search from "../../Search/Search";
import './Navbar.css'
import CartMenu from "../../../pages/User/CartMenu/CartMenu";
import Wrapper from "../../UI/Wrapper/Wrapper";
import ProfileContextMenu from "../../ProfileContextMenu/ProfileContextMenu";
import Logo from "../../UI/Logo/Logo";
import config from "../../../config";

const Navbar = ({ toggleTheme }) => {

    const authContext = useContext(AuthContext)

    const [menuActive, setMenuActive] = useState(false)
    const [activeSearch, setActiveSearch] = useState(false)

    let navigate = useNavigate()
    const loginStatus = () => {
        if (authContext.isAuth) {
            setMenuActive(prevState => (!prevState))
        }
        else {
            const navStr = `login/?back_url=${window.location.pathname}`;

            navigate(`${config.sourceFolder}/${navStr}`, { replace: true });
        }
    }

    useEffect(() => {
        try {
            const user_data = JSON.parse(window.localStorage.getItem("user_data"))
            if (user_data !== null) {
                if (user_data.phone.length === 11) {
                    authContext.sign({ userName: user_data.phone })
                }
            }
        } catch { }
    }, [])

    return (
        <>
            <Search activeSearch={activeSearch} setActiveSearch={setActiveSearch} />
            <header>
                <Wrapper className="navbar">
                    <div className="top-nav">
                        <div className="logo-n-search">
                            <Logo />
                        </div>
                        <nav>
                            <ul className="nav-items">
                                <li className="nav-item slash-left" onClick={loginStatus}>
                                    {(authContext.isAuth) ? <button onBlur={() => setMenuActive(false)} style={{ position: "relative" }}>
                                        <div className={`profile-button ${menuActive ? "active-menu" : ""}`}>
                                            <i className="fa-regular fa-user"></i>
                                            <i className="fa-solid fa-caret-down" style={{ fontSize: "0.8rem" }}></i>
                                        </div>
                                        {menuActive ? <ProfileContextMenu /> : null}
                                    </button> : <div className="login-buttons">
                                        <i className="fa-regular fa-arrow-right-to-bracket"></i>
                                        <p>ورود | ثبت نام</p>
                                    </div>
                                    }
                                </li>
                                <span className="v-slash"></span>
                                <li className="nav-item search-item" onClick={() => setActiveSearch(!activeSearch)}>
                                    <div>
                                        <i className="fa-regular fa-search"></i>
                                    </div>
                                </li>
                                <li className="nav-item" onClick={() => navigate(`${config.sourceFolder}/user/cart`, { replace: true })}>
                                    <CartMenu />
                                </li>
                                <li className="nav-item" onClick={toggleTheme}>
                                    <div>
                                        <i className="fa-regular fa-brush"></i>
                                    </div>
                                </li>
                            </ul>
                        </nav>
                    </div>
                    <div className="bottom-nav">
                        <nav>
                            <ul className="nav-items">
                                <li className="nav-item" onClick={() => navigate(`${config.sourceFolder}/`, { replace: true })}>
                                    <i className="fa-regular fa-home"></i>
                                    <p>خانه</p>
                                </li>
                                <li className="nav-item" onClick={() => navigate(`${config.sourceFolder}/shopping/all`, { replace: true })}>
                                    <i className="fa-regular fa-store"></i>
                                    <p>فروشگاه</p>
                                </li>
                            </ul>
                        </nav>
                    </div>
                </Wrapper>
            </header>
        </>
    )
}

export default Navbar