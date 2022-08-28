import React from 'react'
import './Waves.css'
import Logo from '../Logo/Logo'

const Waves = () => {

    const theme = window.localStorage.getItem("theme")
    const waveStyle = theme === 'dark' ? '68,68,85' : '255,255,255'

    return (
        <div className="footer-wave">
            <div className="inner-header flex">
                <div className='footer-logo'>
                    <Logo />
                </div>
            </div>
            <div>
                <svg className="waves"
                    xmlns="http://www.w3.org/2000/svg"
                    xmlnsXlink="http://www.w3.org/1999/xlink"
                    viewBox="0 24 150 28" preserveAspectRatio="none" shapeRendering="auto">
                    <defs>
                        <path id="gentle-wave" d="M-160 44c30 0 58-18 88-18s 58 18 88 18 58-18 88-18 58 18 88 18 v44h-352z" />
                    </defs>
                    <g className="parallax">
                        <use xlinkHref="#gentle-wave" x="48" y="0" fill={`rgba(${waveStyle}, 0.7)`} />
                        <use xlinkHref="#gentle-wave" x="48" y="3" fill={`rgba(${waveStyle}, 0.5)`} />
                        <use xlinkHref="#gentle-wave" x="48" y="5" fill={`rgba(${waveStyle}, 0.3)`} />
                        <use xlinkHref="#gentle-wave" x="48" y="7" fill={`rgba(${waveStyle}, 1)`} />
                    </g>
                </svg>
            </div>
        </div>
    )
}

export default Waves