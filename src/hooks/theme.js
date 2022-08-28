import { useState, useEffect } from "react";
import './theme.css'

const useTheme = () => {
    const [theme, setTheme] = useState('light')

    const toggleTheme = () => {
        if (theme === 'light') {
            window.localStorage.setItem('theme', 'dark')
            document.body.classList.remove('light-theme')
            document.body.classList.add('dark-theme')
            setTheme('dark')
        } else {
            window.localStorage.setItem('theme', 'light')
            document.body.classList.remove('dark-theme')
            document.body.classList.add('light-theme')
            setTheme('light')
        }
    }

    useEffect(() => {
        const localTheme = window.localStorage.getItem('theme')
        if (localTheme === 'dark') {
            window.localStorage.setItem('theme', 'dark')
            document.body.classList.remove('light-theme')
            document.body.classList.add('dark-theme')
            setTheme('dark')
        } else {
            window.localStorage.setItem('theme', 'light')
            document.body.classList.remove('dark-theme')
            document.body.classList.add('light-theme')
            setTheme('light')
        }
    }, [])

    return [theme, toggleTheme]
}

export default useTheme