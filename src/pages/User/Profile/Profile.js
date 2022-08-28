import React, { useState, useEffect, useContext } from "react";
import { CartContext } from "../../../context/cart-context";

import Box from "../../../components/UI/Box/Box";
import './Profile.css'
import ComingSoon from "../../../components/UI/ComingSoon/ComingSoon";

const Profile = () => {

    const cartContext = useContext(CartContext)

    const [orderSummery, setOrderSummery] = useState([
        { iconClass: "fa-solid fa-truck-fast blue-grad icon-background", text: "جاری", value: "0" },
        { iconClass: "fa-solid fa-box-check green-grad icon-background", text: "تحویل داده شده", value: "0" },
        { iconClass: "fa-solid fa-square-fragile yellow-grad icon-background", text: "مرجوعی", value: "0" }
    ])

    useEffect(() => {
        if (cartContext.orders.length !== 0) {
            let orderCount = { in_progress: 0, recieved: 0, returned: 0 }
            cartContext.orders.forEach((element) => {
                if (element.state === 'pending' || element.state === 'sending') {
                    orderCount.in_progress++;
                }
                else if (element.state === 'recieved' || element.state === 'returned') {
                    orderCount[element.state]++;
                }
            });

            setOrderSummery(prevState => ([
                { ...prevState[0], value: orderCount['in_progress'] },
                { ...prevState[1], value: orderCount['recieved'] },
                { ...prevState[2], value: orderCount['returned'] }
            ]))
        }
    }, [cartContext.orders])

    return (
        <>
            <Box className="marg-b-20"
                contentClass="flex-align flex-justify-center pad-20 order-status-box"
                headConfig={{
                    exist: true,
                    title: "سفارش‌های من",
                    navigate: { exist: true, link: "/user/orders" }
                }}
            >
                {orderSummery.map(item => {
                    return (
                        <div className="flex-align marg-15-30 order-status-items" key={item.text}>
                            <i className={`${item.iconClass} font-3rem`}></i>
                            <div style={{ margin: "0 16px" }}>
                                <p className="descripe-2">{item.text}</p>
                                <p className="title-3">
                                    <span className="font-samim">{item.value}</span>
                                    <span> سفارش</span>
                                </p>
                            </div>
                        </div>
                    )
                })}

            </Box>
            <Box
                contentClass="flex-align flex-justify-center"
                className="marg-b-20"
                headConfig={{ exist: true, title: "آخرین بازدیدها", navigate: { exist: false } }}>
                <ComingSoon />
            </Box>
        </>
    )
}

export default Profile