import React from 'react'
import { useNavigate } from 'react-router-dom'
import './Tabs.css'

const Tabs = ({ data }) => {

    let navigate = useNavigate()

    return (
        <nav className='tab-items'>
            <ul>
                {data.map(item => {
                    let activeTab = item.selected === true ? 'active-tab' : ''
                    return (
                        <div key={item.text} className={`tab-item ${activeTab}`} onClick={() => navigate(item.link, { replace: true })}>
                            <li className='flex-align no-select' key={item.text}>
                                <p className='title-2'>{item.text}</p>
                                <p className='font-samim tab-number'>{item.value}</p>
                            </li>
                            <span className='tab-underline'></span>
                        </div>
                    )
                })}
            </ul>
        </nav>
    )
}

export default Tabs