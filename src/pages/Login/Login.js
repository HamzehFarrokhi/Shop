import React, { useState, useContext } from "react";
import { useNavigate } from 'react-router-dom';
import LoginForm from "../../components/LoginForm/LoginForm";
import { AuthContext } from "../../context/auth-context";

import './Login.css'
import Message from "../../components/UI/Message/Message";
import LoadingSpinner from "../../components/UI/LoadingSpinner/LoadingSpinner";
import Logo from "../../components/UI/Logo/Logo";
import useTheme from '../../hooks/theme'

const Login = () => {
    const [userState, setUserState] = useState(0)

    const authContext = useContext(AuthContext)

    const [,] = useTheme()

    let navigate = useNavigate()
    const goBackUrl = () => {
        authContext.goBack()

        let url = new URL(window.location.href)
        const backUrl = url.searchParams.get("back_url")
        let pathName = backUrl === null ? "/" : backUrl

        navigate(pathName, { replace: true })
    }

    const showCodeMessage = (userState === 201) ? <Message text={"کد تایید شما برابر است با: 1234"} /> : null

    const loadingState = authContext.isLoading ? <LoadingSpinner className="login-loader" /> : null

    return (
        <div className="login-body">
            <div className="login-card">
                <div className="relative-card">
                    <div className="back-to-url" onClick={goBackUrl}>
                        <i className="fa-solid fa-chevron-left"></i>
                        <p className="back-text">بازگشت</p>
                    </div>
                    <div className="center marg-v-20">
                        <Logo />
                    </div>
                    {loadingState}
                    <p className="form-title">ورود | ثبت نام</p>
                    <LoginForm
                        userState={userState}
                        setUserState={setUserState}
                    />
                </div>
            </div>
            {authContext.smsAuth ? null : showCodeMessage}
        </div>
    )
}

export default Login