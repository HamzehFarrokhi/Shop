import React from "react";
import { Routes, Route } from "react-router-dom";

import Shipping from "./Shipping/Shipping";
import Varify from "./Varify/Varify";
import NotFound from "../../components/UI/NotFound/NotFound";

const Checkout = () => {
    return (
        <Routes>
            <Route path={`/shipping`} element={<Shipping />} />
            <Route path={`/varify`} element={<Varify />} />
            <Route path={`*`} element={<NotFound
                text="صفحه مورد نظر شما یافت نشد!"
                desc="آدرس وارد شده را بررسی کرده و دوباره امتحان کنید. "
            />} />
        </Routes>
    )
}

export default Checkout