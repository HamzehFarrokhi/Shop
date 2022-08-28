import React from 'react'
import './Box.css'

import Navigator from '../Navigator/Navigator'

const Box = ({ children, className, contentClass, headConfig }) => {
    return (
        <div className={`simple-box ${className}`}>
            {headConfig.exist ? <div className='box-head'>
                <p className='box-title title-2'>{headConfig.title}</p>
                {headConfig.navigate.exist ? <Navigator
                    text="مشاهده همه"
                    link={headConfig.navigate.link}
                    config={{}}
                /> : null}
            </div> : null}
            <div className={`box-content ${contentClass}`}>
                {children}
            </div>
        </div>
    )
}

export default Box