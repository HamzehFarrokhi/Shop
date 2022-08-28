import React, { useEffect, useContext, useState } from "react";
import { Routes, Route } from "react-router-dom";
import { AuthContext } from "../../context/auth-context";
import './UserLayout.css'

import Profile from '../../pages/User/Profile/Profile';
import Orders from '../../pages/User/Orders/Orders';
import Order from '../../pages/User/Order';
import Interested from '../../pages/User/Interested';
import Comments from '../../pages/User/Comments';
import Address from '../../pages/User/Address';
import Cards from '../../pages/User/Cards';
import Messages from '../../pages/User/Messages';
import Edit from '../../pages/User/Edit';
import Cart from '../../pages/User/Cart/Cart'

import UserSideMenu from './UserSideMenu/UserSideMenu';
import NotFound from "../UI/NotFound/NotFound";
import LoadingSpinner from "../UI/LoadingSpinner/LoadingSpinner";
import useTheme from '../../hooks/theme';
import Wrapper from '../UI/Wrapper/Wrapper';
import Box from "../UI/Box/Box";
import Auth from '../Auth/Auth';

const UserLayout = () => {

    const theme = useTheme()
    const authContext = useContext(AuthContext)

    useEffect(() => {
        const user_data = JSON.parse(window.localStorage.getItem("user_data"))

        if (user_data !== null) {
            if (user_data.phone.length === 11) {
                authContext.sign({ userName: user_data.phone })
            }
        }
    }, [])

    return (
        authContext.isLoading ? <LoadingSpinner className="big-spinner" /> : (authContext.isAuth ? <Wrapper className="user-page">
            <Routes>
                <Route path={`/cart`} element={<Cart />} />
                <Route path="*" element={
                    <div style={{ display: "flex" }}>
                        <UserSideMenu />
                        <div className={`user-page-content w-100 ${theme}`} >
                            <Routes>
                                <Route path={`/profile`} element={<Profile />} />
                                <Route path={`/orders`} element={<Orders />} />
                                <Route path={`/orders/:tab`} element={<Orders />} />
                                <Route path={`/intrested`} element={<Interested />} />
                                <Route path={`/comments`} element={<Comments />} />
                                <Route path={`/address`} element={<Address />} />
                                <Route path={`/cards`} element={<Cards />} />
                                <Route path={`/messages`} element={<Messages />} />
                                <Route path={`/edit`} element={<Edit />} />
                                <Route path={`/order/:orderId`} element={<Order />} />
                                <Route path={`*`} element={<div style={{ maxWidth: '900px', margin: '0 auto' }}><Box className="marg-h-20 pad-20" headConfig={{ exist: false }}>
                                    <NotFound text="صفحه مورد نظر شما یافت نشد!" desc="آدرس وارد شده را بررسی و دوباره امتحان کنید." />
                                </Box></div>} />
                            </Routes>
                        </div>
                    </div>} />
            </Routes>
        </Wrapper> : <Auth link={window.location.pathname} />)
    )
}

export default UserLayout