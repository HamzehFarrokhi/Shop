import React from 'react'
import { Link } from 'react-router-dom'
import './Footer.css'
import Waves from '../UI/Waves/Waves'

const Footer = () => {
    return (
        <footer>
            <Waves />
            <div className='footer-content'>
                <section className='footer-links'>
                    <nav className='flex-align'>
                        <ul>
                            <li><Link to={'/'}>خانه</Link></li>
                            <li><Link to={'/shopping/all'}>فروشگاه</Link></li>
                            <li><Link to={'/user/profile'}>حساب کاربری</Link></li>
                        </ul>
                        <ul>
                            <li><Link to={'/user/orders'}>سفارش‌ها</Link></li>
                            <li><Link to={'/user/cart'}>سبد خرید</Link></li>
                            <li><Link to={'/forget-password'}>فراموشی رمز عبور</Link></li>
                        </ul>
                    </nav>
                </section>
                <section className='footer-social-apps'>
                    <div className='social-apps'>
                        <i className="fa-brands fa-instagram-square icon-background insta-grad"></i>
                        <i className="fa-brands fa-telegram icon-background blue-grad"></i>
                        <i className="fa-brands fa-whatsapp-square icon-background green-grad"></i>
                    </div>
                </section>
                <section className='footer-trust-logos'>
                    <div className='trust-logos flex-align'>
                        <div></div>
                        <div></div>
                        <div></div>
                    </div>
                </section>
            </div>
        </footer>
    )
}

export default Footer
