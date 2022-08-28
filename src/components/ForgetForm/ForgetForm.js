import React, { useState, useContext, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import { ForgetContext } from "../../context/forget-context";

import './ForgetForm.css'
import Input from "../../components/UI/Input/Input";
import Button from "../../components/UI/Button/Button";
import Wrapper from "../UI/Wrapper/Wrapper";
import Card from "../UI/Card/Card";
import Message from "../UI/Message/Message";
import Logo from "../UI/Logo/Logo";

const ForgetForm = () => {
    const [userState, setUserState] = useState(0)

    const forgetContext = useContext(ForgetContext)

    const [userStatusMessage, setUserStatusMessage] = useState(null)
    const [errorMessage, setErrorMessage] = useState(null)

    const [userData, setUserData] = useState({
        name: null,
        phone: null,
        email: null,
        address: null,
        varified: null
    })

    const [phoneInput, setPhoneInput] = useState({
        tag: 'phone', type: 'text', placeholder: 'شماره موبایل', value: '', validation: {
            required: true,
            length: 11,
            number: true
        }, valid: false, used: false
    })
    const [passInput, setPassInput] = useState({
        tag: 'password', type: 'password', placeholder: 'کد تایید', value: '', validation: {
            required: true,
            min: 4
        }, valid: false, used: false
    })
    const [newPass1, setNewPass1] = useState({
        tag: 'password_1', type: 'password', placeholder: 'رمز عبور', value: '', validation: {
            required: true,
            min: 4
        }, valid: false, used: false
    })
    const [newPass2, setNewPass2] = useState({
        tag: 'password_2', type: 'password', placeholder: 'تایید رمز عبور', value: '', validation: {
            required: true,
            min: 4
        }, valid: false, used: false
    })

    const checkValidation = (value, rules) => {
        let isValid = []
        if (rules.required) {
            isValid.push(value.trim() !== '')
        }
        if (rules.length) {
            isValid.push(value.length === 11)
        }
        if (rules.number) {
            const intValue = parseInt(value)
            isValid.push(Number.isInteger(intValue))
        }
        if (rules.min) {
            isValid.push(value.length >= 4)
        }
        let final = !isValid.some((x) => x === false)

        return final
    }

    const [passwordError, setPasswordError] = useState({ passError1: null, passError2: null })
    const passwordController = (value, action) => {
        if (action === "pass1") {
            setNewPass1((prevState) => ({ ...prevState, value: value }))

            if (value !== "") {
                let isError = false
                if (value.length < 8)
                    isError = true
                if (!(/\d/.test(value)))
                    isError = true
                if (!(/[a-zA-Z]/g.test(value)))
                    isError = true;

                if (isError) {
                    setPasswordError((prevState) => ({
                        ...prevState,
                        passError1: <li className="forget-status-message" style={{ color: "var(--errorText)", fontSize: "0.7rem" }}>
                            <span>رمز عبور باید حداقل </span>
                            <span style={{ fontFamily: "Samim" }}>8 </span>
                            <span>رقم و ترکیبی از اعداد و متن باشد.</span>
                        </li>
                    }))
                }
                else {
                    setPasswordError((prevState) => ({
                        ...prevState,
                        passError1: null
                    }))
                }

                if (value === newPass2.value) {
                    setPasswordError((prevState) => ({
                        ...prevState,
                        passError2: null
                    }))
                } else {
                    setPasswordError((prevState) => ({
                        ...prevState,
                        passError2: <li className="forget-status-message" style={{ color: "var(--errorText)", fontSize: "0.7rem" }}>
                            <span>تکرار رمز عبور بدرستی وارد نشده است.</span>
                        </li>
                    }))
                }
            }
            else {
                setPasswordError({
                    passError1: null,
                    passError2: null
                })
            }
        }
        else if (action === "pass2") {
            setNewPass2((prevState) => ({ ...prevState, value: value }))

            if (value !== "") {
                if (newPass1.value === value) {
                    setPasswordError((prevState) => ({
                        ...prevState,
                        passError2: null
                    }))
                } else {
                    setPasswordError((prevState) => ({
                        ...prevState,
                        passError2: <li className="forget-status-message" style={{ color: "var(--errorText)", fontSize: "0.7rem" }}>
                            <span>تکرار رمز عبور بدرستی وارد نشده است.</span>
                        </li>
                    }))
                }
            } else {
                setPasswordError((prevState) => ({
                    ...prevState,
                    passError2: null
                }))
            }
        }
    }

    useEffect(() => {
        const userStatus = forgetContext.forgetData.userStatus

        if (userStatus === 0) {
            setUserState(0)
            setUserStatusMessage(<p className="forget-status-message">
                <span>برای شروع فرآیند بازیابی، شماره موبایل حساب کاربری خود را وارد کنید.</span>
            </p>)
        }
        else if (userStatus === 200) {
            setUserData((prevState) => ({ ...prevState, ...forgetContext.forgetData.data }))
            setUserStatusMessage(
                <p className="forget-status-message">
                    <span>کد تایید فرستاده شده به شماره </span>
                    <span style={{ fontFamily: "Samim" }}>{userData.phone}</span>
                    <span> را وارد کنید</span>
                </p>
            )
            setUserState(200)
        }
        else if (userStatus === 201) {
            setUserStatusMessage(
                <p className="forget-status-message">
                    <span>حساب کاربری با شماره موبایل </span>
                    <span style={{ fontFamily: "Samim" }}>{userData.phone} </span>
                    <span>وجود ندارد.</span>
                </p>
            )
            setUserState(201)
        }
        else if (userStatus === 404) {
            setUserStatusMessage(
                <p className="forget-status-message">
                    <span>با عرض پوزش، مشکلی در ارتباط پیش آمده، لطفا دوباره تلاش کنید.</span>
                </p>
            )
            setUserState(404)
        }
        else {
            setUserStatusMessage(null)
            setUserState(0)
        }

        const authStatus = forgetContext.forgetData.authStatus
        if (authStatus === 404) {
            setErrorMessage(
                <p className="error-input">
                    لطفا مقدار وارد شده را بررسی کنید.
                </p>
            )
        }
    }, [forgetContext.forgetData, setUserState, userData.phone])

    let navigate = useNavigate();
    useEffect(() => {
        if (forgetContext.isAuth) {
            setUserStatusMessage(
                <p className="user-status">
                    <span>رمز عبور شما با موفقیت تغییر یافت.</span>
                </p>
            )
        }
    }, [forgetContext.isAuth, navigate, forgetContext.forgetData.data])

    const submitHandler = (event) => {
        event.preventDefault()

        if (forgetContext.smsAuth) {
            if (passwordError.passError1 === null && passwordError.passError2 === null) {
                setUserData((prevState) => ({ ...prevState, name: forgetContext.forgetData.data.name }))
                forgetContext.changePassword({ phone: userData.phone, password: newPass1.value })
            }
        }
        else if (userState === 0) {
            setUserData((prevState) => ({ ...prevState, phone: phoneInput.value }))

            let checkValue = checkValidation(phoneInput.value, phoneInput.validation)

            if (checkValue) {
                forgetContext.sign({ username: phoneInput.value })
                setErrorMessage(null)
            }
            else {
                setErrorMessage(
                    <p className="error-input">
                        <span>مقدار باید بصورت </span>
                        <span>---- --- --</span>
                        <span className="phone-number">09</span>
                        <span> وارد شود.</span>
                    </p>
                )
            }
        }
        else {
            let checkValue = checkValidation(passInput.value, passInput.validation)
            if (checkValue) {
                if (passInput.value === "1234") {
                    forgetContext.smsLogin()
                    setUserStatusMessage(
                        <p className="user-status">
                            <span>رمز جدید را برای حساب خود وارد کنید</span>
                        </p>
                    )
                    setErrorMessage(null)
                }
                else {
                    setErrorMessage(
                        <p className="error-input">
                            لطفا مقدار وارد شده را بررسی کنید.
                        </p>
                    )
                }
            }
            else {
                setErrorMessage(
                    <p className="error-input">
                        لطفا مقدار وارد شده را بررسی کنید.
                    </p>
                )
            }
        }
    }

    const showPhoneInput = (userState === 0) ? <Input
        myclass="form-input"
        autoFocus
        config={phoneInput}
        key={phoneInput.tag}
        onChange={(event) => setPhoneInput((prevState) => ({ ...prevState, value: event.target.value }))}
    /> : null

    const showPassInput = (userState === 200) ? <Input
        myclass="form-input"
        autoFocus
        config={passInput}
        key={passInput.tag}
        onChange={(event) => setPassInput((prevState) => ({ ...prevState, value: event.target.value }))}
    /> : null

    const editPhone = (userState === 200 || userState === 201) ? <div
        className="edit-phone"
        onClick={forgetContext.goBack}
    >
        <p className="back-text">ویرایش شماره</p>
        <i className="fa-solid fa-chevron-right"></i>
    </div> : null

    const changePasswordform = <div>
        <p className="forget-status-message" style={{ paddingBottom: "10px" }}>
            <span>احراز هویت با موفقیت انجام شد. لطفا رمز عبور جدید را وارد کنید.</span>
        </p>
        <Input
            myclass="form-input input-vazir"
            autoFocus
            config={newPass1}
            key={newPass1.tag}
            onChange={(event) => passwordController(event.target.value, "pass1")}
        />
        <Input
            myclass="form-input input-vazir"
            config={newPass2}
            key={newPass2.tag}
            onChange={(event) => passwordController(event.target.value, "pass2")}
        />
        <ul>
            {passwordError.passError1}
            {passwordError.passError2}
        </ul>
    </div>

    const submitButton = <Button btnType='width-100 form'>{forgetContext.smsAuth ? "تغییر رمز عبور" : "ادامه"}</Button>

    const showCodeMessage = (userState === 200) ? <Message text={"کد تایید شما برابر است با: 1234"} /> : null

    const loadingState = forgetContext.isLoading ? <div className="login-loader"><i className="fa-light fa-circle-notch fa-spin"></i></div> : null

    return (
        <>
            <Wrapper>
                <Card className="forget-card">
                    <div className="forget-form">
                        <div className="center">
                            <Logo />
                        </div>
                        {loadingState}
                        <p className="forget-title">بازیابی رمز عبور</p>
                        {forgetContext.isAuth ? userStatusMessage : <form onSubmit={(event) => submitHandler(event)}>
                            {forgetContext.smsAuth ? changePasswordform :
                                <>
                                    {userStatusMessage}
                                    {showPhoneInput}
                                    {showPassInput}
                                    {errorMessage}
                                    {editPhone}
                                </>
                            }
                            {(userState === 404 || userState === 201) ? null : submitButton}
                        </form>}
                    </div>
                </Card>
            </Wrapper>
            {forgetContext.smsAuth ? null : showCodeMessage}
        </>
    )
}

export default ForgetForm