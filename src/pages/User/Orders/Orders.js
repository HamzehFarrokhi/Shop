import React, { useContext, useEffect, useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import { CartContext } from '../../../context/cart-context'

import Box from '../../../components/UI/Box/Box'
import Tabs from '../../../components/UI/Tabs/Tabs'
import NotFound from '../../../components/UI/NotFound/NotFound'
import config from '../../../config'
import './Orders.css'
import LoadingSpinner from '../../../components/UI/LoadingSpinner/LoadingSpinner'

const Orders = () => {
    const cartContext = useContext(CartContext)
    const [cartList, setCartList] = useState([])

    let { tab } = useParams()

    const [catItem, setCatItem] = useState([
        { id: 1, text: "جاری", link: "/user/orders/in_progress", value: "0", selected: true },
        { id: 2, text: "تحویل شده", link: "/user/orders/recieved", value: "0", selected: false },
        { id: 3, text: "مرجوع شده", link: "/user/orders/returned", value: "0", selected: false },
        { id: 4, text: "لغو شده", link: "/user/orders/canceled", value: "0", selected: false }
    ])

    const orderTypeIcon = {
        'pending': { icon: 'fa-solid fa-memo-circle-check icon-background orange-grad' },
        'sending': { icon: 'fa-solid fa-truck-fast icon-background blue-grad' },
        'recieved': { icon: 'fa-solid fa-location-check icon-background green-grad' },
        'returned': { icon: 'fa-solid fa-square-fragile icon-background yellow-grad' },
        'canceled': { icon: 'fa-solid fa-hexagon-xmark icon-background gray-grad' }
    }

    useEffect(() => {
        if (cartContext.orders.length !== 0) {
            let newCartList = { in_progress: [], recieved: [], returned: [], canceled: [] }
            cartContext.orders.forEach((element) => {
                if (element.state === 'pending' || element.state === 'sending') {
                    const pushData = [...newCartList['in_progress'], element]
                    newCartList = { ...newCartList, in_progress: pushData }
                }
                else if (element.state === 'recieved' || element.state === 'returned' || element.state === 'canceled') {
                    const pushData = [...newCartList[element.state], element]
                    newCartList = { ...newCartList, [element.state]: pushData }
                }
            });

            let selectedState = 1;
            if (tab === 'in_progress' || tab === undefined) {
                setCartList(newCartList['in_progress'])
                selectedState = 1;
            }
            else if (tab === 'recieved') {
                setCartList(newCartList['recieved'])
                selectedState = 2;
            }
            else if (tab === 'returned') {
                setCartList(newCartList['returned'])
                selectedState = 3;
            }
            else if (tab === 'canceled') {
                setCartList(newCartList['canceled'])
                selectedState = 4;
            }

            setCatItem(prevState => ([
                { ...prevState[0], value: newCartList['in_progress'].length, selected: prevState[0].id === selectedState ? true : false },
                { ...prevState[1], value: newCartList['recieved'].length, selected: prevState[1].id === selectedState ? true : false },
                { ...prevState[2], value: newCartList['returned'].length, selected: prevState[2].id === selectedState ? true : false },
                { ...prevState[3], value: newCartList['canceled'].length, selected: prevState[3].id === selectedState ? true : false }
            ]))
        }
    }, [cartContext.orders, tab])

    const cartListRenderer = cartList.length !== 0 ? cartList.map((order) => {
        let productList = <></>
        try {
            let newCart = JSON.parse(order.cart)
            productList = newCart.map((item) => {
                const imgLocSmall = `${config.sourceFolder}/img/products/75/${item.id}.png`
                return (
                    <div className='flex-align marg-v-10' style={{ marginLeft: "12px", width: "250px" }} key={item.id}>
                        <Link target="_blank" to={`/product/${item.id}`}>
                            <img
                                className='cursor-pointer'
                                src={imgLocSmall}
                                alt={item.productName} />
                        </Link>
                        <div>
                            <p className='title-4 clamp-text-2'>{item.productName}</p>
                            <div className='flex-align flex-gap-10 marg-b-10'>
                                <span className='color-circle' style={{ backgroundColor: item.color }}></span>
                                <p className='descripe-2'>{config.colors[item.color]}</p>
                            </div>
                        </div>
                    </div>
                )
            })
        } catch { }

        let selectedState = orderTypeIcon[order.state]

        return <Box className="marg-30 order-items" headConfig={{ exist: false }} key={order.date}>
            <div>
                <div className='flex-align marg-20 order-main-status'>
                    <p>
                        <i className={selectedState.icon}></i>
                        <span className='descripe'>وضعیت: </span>
                        <span className='title-3'>{config.orderState[order.state]}</span>
                    </p>
                    <span className='seperator'></span>
                    <p>
                        <span className='descripe'>تاریخ: </span>
                        <span className='font-samim title-2'>{order.date.split(" ")[0]}</span>
                    </p>
                    <span className='seperator'></span>
                    <p>
                        <span className='descripe'>قیمت کل: </span>
                        <span className='font-samim title-2'>{order.total_price}</span>
                    </p>
                </div>
            </div>

            <p>{order.address}</p>
            <p>{order.estimated}</p>
            <div className='flex-align order-cart pad-v-20' style={{ borderTop: "1px solid var(--border)" }}>
                {productList}
            </div>
        </Box>

    }) : <NotFound text="پیام" desc="سفارشی در این بخش موجود نیست!" />

    return (
        <Box className="marg-b-20" headConfig={{ exist: true, title: "تاریخچه سفارشات", navigate: { exist: false } }}>
            <Tabs data={catItem} />
            {cartContext.orders.length !== 0 ? cartListRenderer : <LoadingSpinner className="big-spinner" />}
        </Box>
    )
}

export default Orders