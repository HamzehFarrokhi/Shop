import React, { useEffect } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import useTheme from "../../hooks/theme";
import ForgetContextProvider from "../../context/forget-context";

import Footer from "../Footer/Footer";
import Navbar from "../Naviation/Navbar/Navbar";
import './Layout.css'
import Home from "../../pages/Home/Home";
import NotFound from "../UI/NotFound/NotFound";
import Checkout from "../../pages/Checkout/Checkout";
import UserLayout from "../UserLayout/UserLayout";
import Shopping from "../../pages/Shopping/Shopping";
import ProductView from "../../pages/ProductView/ProductView";
import ForgetForm from "../ForgetForm/ForgetForm";
import Box from "../UI/Box/Box";
import Wrapper from "../UI/Wrapper/Wrapper";

const Layout = () => {
    const [, toggleTheme] = useTheme()

    const location = useLocation();
    useEffect(() => {
        window.scrollTo({ top: 0, behavior: "smooth" })
    }, [location.pathname])

    return (
        <>
            <Navbar toggleTheme={toggleTheme} />
            <div className='pad-v-10' style={{ minHeight: "60vh" }} >
                <Routes>
                    <Route path={`/`} element={<Home />} />
                    <Route path={`/forget-password`} element={
                        <ForgetContextProvider>
                            <ForgetForm />
                        </ForgetContextProvider>}
                    />
                    <Route path={`/user/*`} element={<UserLayout />} />
                    <Route path={`/checkout`} element={<Checkout />} />
                    <Route path={`/shopping/:category`} element={<Shopping />} />
                    <Route path={`/shopping/:category/:filter`} element={<Shopping />} />
                    <Route path={`/product/:id`} element={<ProductView />} />
                    <Route path={`*`} element={<div style={{maxWidth: '900px', margin: '25px auto'}}><Box className="marg-20 pad-20" headConfig={{ exist: false }}>
                        <NotFound text="صفحه مورد نظر شما یافت نشد!" desc="آدرس وارد شده را بررسی و دوباره امتحان کنید." />
                    </Box></div>} />
                </Routes>
            </div>
            <Footer />
        </>
    )
}

export default Layout