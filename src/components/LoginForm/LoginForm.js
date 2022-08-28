import React, { useState, useContext, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import { AuthContext } from "../../context/auth-context";

import './LoginForm.css'
import Input from "../../components/UI/Input/Input";
import Button from "../../components/UI/Button/Button";

const LoginForm = ({ userState, setUserState }) => {

    const authContext = useContext(AuthContext)

    const [userStatusMessage, setUserStatusMessage] = useState(null)
    const [errorMessage, setErrorMessage] = useState(null)

    const [userData, setUserData] = useState({
        name: null,
        phone: null,
        email: null,
        address: null,
        varified: null
    })

    const [nameInput, setNameInput] = useState({
        tag: 'name', type: 'text', placeholder: 'نام', value: '', validation: {
            required: true
        }, valid: false, used: false
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
                        passError1: <li className="user-status" style={{ color: "var(--errorText)" }}>
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
                        passError2: <li className="user-status" style={{ color: "var(--errorText)" }}>
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
                        passError2: <li className="user-status" style={{ color: "var(--errorText)", paddingTop: "5px" }}>
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
        const userStatus = authContext.userData.userStatus

        if (userStatus === 0) {
            setUserState(0)
            setUserStatusMessage(null)
        }
        else if (userStatus === 200) {
            setUserData((prevState) => ({ ...prevState, ...authContext.userData.data }))
            setUserStatusMessage(
                <p className="user-status">
                    <span>سلام</span>
                    <span> {authContext.userData.data.name}</span>
                    <span>، رمز عبور را وارد کنید</span>
                </p>
            )
            setPassInput(prevState => ({ ...prevState, placeholder: 'رمز عبور' }))
            setUserState(200)
        }
        else if (userStatus === 201) {
            setUserStatusMessage(
                <p className="user-status">
                    <span>حساب کاربری با شماره موبایل </span>
                    <span className="phone-number">{userData.phone} </span>
                    <span>وجود ندارد. برای ساخت حساب جدید، کد تایید به این شماره ارسال گردید.</span>
                </p>
            )
            setPassInput(prevState => ({ ...prevState, placeholder: 'کد تایید' }))
            setUserState(201)
        }
        else if (userStatus === 404) {
            setUserStatusMessage(
                <p className="user-status">
                    <span>با عرض پوزش، مشکلی در ارتباط پیش آمده، لطفا دوباره تلاش کنید.</span>
                </p>
            )
            setUserState(404)
        }
        else {
            setUserStatusMessage(null)
            setUserState(0)
        }

        const authStatus = authContext.userData.authStatus
        if (authStatus === 404) {
            setErrorMessage(
                <p className="error-input">
                    لطفا مقدار وارد شده را بررسی کنید.
                </p>
            )
        }
    }, [authContext.userData, setUserState, userData.phone])

    let navigate = useNavigate();
    useEffect(() => {
        if (authContext.isAuth) {
            let url = new URL(window.location.href)
            const backUrl = url.searchParams.get("back_url")

            window.localStorage.setItem("user_data", JSON.stringify(authContext.userData.data))
            navigate(backUrl, { replace: true })
        }
    }, [authContext.isAuth, navigate, authContext.userData.data])

    const submitHandler = (event) => {
        event.preventDefault()

        if (authContext.smsAuth) {
            let user_name = nameInput.value

            if (user_name !== "" & passwordError.passError1 === null && passwordError.passError2 === null) {
                setUserData((prevState) => ({ ...prevState, name: user_name }))
                authContext.createAccount({ name: user_name, phone: userData.phone, password: newPass1.value })
            }
        }
        else if (userState === 0) {
            setUserData((prevState) => ({ ...prevState, phone: phoneInput.value }))

            let checkValue = checkValidation(phoneInput.value, phoneInput.validation)
            if (checkValue) {
                authContext.getAuthData({ userName: phoneInput.value })
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
            const resStatus = authContext.userData.userStatus
            let checkValue = checkValidation(passInput.value, passInput.validation)
            if (checkValue) {

                if (resStatus === 200) {
                    authContext.login({ userName: phoneInput.value, passWord: passInput.value })
                }
                else if (resStatus === 201) {
                    if (passInput.value === "1234") {
                        authContext.smsLogin()
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

    const showPassInput = (userState !== 0 && userState !== 404) ? <Input
        myclass="form-input input-vazir"
        autoFocus
        config={passInput}
        key={passInput.tag}
        onChange={(event) => setPassInput((prevState) => ({ ...prevState, value: event.target.value }))}
    /> : null

    const editPhone = (userState === 200 || userState === 201) ? <div
        className="edit-phone"
        onClick={authContext.goBack}
    >
        <p className="back-text">ویرایش شماره</p>
        <i className="fa-solid fa-chevron-right"></i>
    </div> : null

    const forgetPass = (userState === 200) ? <div
        className="edit-phone"
        onClick={() => window.open("/forget-password", "_blank")}
    >
        <p className="back-text">بازیابی رمز عبور</p>
        <i className="fa-solid fa-chevron-right"></i>
    </div> : null

    const createAccountform = <div>
        <p className="user-status" style={{ paddingBottom: "10px" }}>
            <span>لطفا اطلاعات مورد نیاز برای ساخت حساب جدید را وارد نمایید.</span>
        </p>
        <Input
            myclass="form-input input-rtl"
            autoFocus
            config={nameInput}
            key={nameInput.tag}
            onChange={(event) => setNameInput((prevState) => ({ ...prevState, value: event.target.value }))}
        />
        <Input
            myclass="form-input input-vazir"
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

    const submitButton = authContext.smsAuth ? <Button btnType='width-100 form'>ساخت حساب</Button> :
        <Button btnType='width-100 form'>{(userState !== 0) ? "ادامه" : "ورود"}</Button>

    return (
        <form onSubmit={(event) => submitHandler(event)}>
            {authContext.smsAuth ? createAccountform :
                <>
                    {userStatusMessage}
                    {showPhoneInput}
                    {showPassInput}
                    {errorMessage}
                    {editPhone}
                    {forgetPass}
                </>
            }
            {authContext.userData.userStatus === 404 ? null : submitButton}

        </form>
    )
}

export default LoginForm