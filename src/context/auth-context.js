import React, { useState } from "react";
import axios from '../axios/axios'

export const AuthContext = React.createContext({
    isAuth: false,
    isLoading: false,
    smsAuth: false,
    sign: () => { },
    login: () => { },
    getAuthData: () => { },
    goBack: () => { },
    smsLogin: () => { },
    createAccount: () => { },
    userData: {
        userStatus: 0,
        authStatus: 0,
        data: {
            name: '',
            phone: 0,
            email: '',
            address: '',
            token: '',
            varified: 0
        }
    }
})

const AuthContextProvider = (props) => {
    const [isLoggedIn, setIsLoggedIn] = useState(false)
    const [isLoading, setIsLoading] = useState(false)
    const [isSmsAuth, setIsSmsAuth] = useState(false)
    const [userData, setUserData] = useState({ userStatus: 0, authStatus: 0, data: {} })

    const userHandler = async ({ userName }) => {
        setIsLoading(true)
        const user_data = JSON.parse(window.localStorage.getItem("user_data"))
        let token = user_data !== null ? user_data.token : ''

        window.localStorage.removeItem("user_data")

        await axios.post('https://armateam.ir/rest/shop/authenticate/', {
            action: 'USER_CHECK',
            username: userName,
            token: token
        })
            .then((response) => {
                setUserData((prevState) => ({ ...prevState, userStatus: response.data.status, data: { ...response.data } }))
                if (response.data.status === 200) {
                    window.localStorage.setItem("user_data", JSON.stringify(response.data))
                    setUserData((prevState) => ({ ...prevState, authStatus: 200 }))
                    setIsLoggedIn(true)
                } else {
                    setUserData((prevState) => ({ ...prevState, userStatus: 0, authStatus: 0, data: {} }))
                }
                setIsLoading(false)
            })
            .catch((error) => {
                setUserData((prevState) => ({ ...prevState, userStatus: 0, authStatus: 0, data: {} }))
                setIsLoading(false)
                console.log(error);
            });
    }

    const loginHandler = async ({ userName, passWord }) => {
        setIsLoading(true)
        let responseStatus = 0;

        await axios.post('https://armateam.ir/rest/shop/authenticate/', {
            action: 'AUTH_CHECK',
            username: userName,
            password: passWord
        })
            .then((response) => {
                responseStatus = response.data.status
                setUserData((prevState) => ({ ...prevState, authStatus: response.data.status, data: { ...prevState.data, ...response.data } }))
                setIsLoading(false)
            })
            .catch((error) => {
                setIsLoading(false)
                console.log(error);
            });

        if (responseStatus === 200) {
            setIsLoggedIn(true)
            setUserData(prevState => ({ ...prevState, userStatus: 0, authStatus: 0 }))
        }
        else
            setIsLoggedIn(false)
    }

    const goBack = () => {
        setIsSmsAuth(false)
        setUserData(prevState => ({ ...prevState, userStatus: 0, authStatus: 0 }))
    }

    const smsLogin = () => {
        setIsSmsAuth(true)
    }

    const createAccount = async ({ name, phone, password }) => {
        setIsLoading(true)
        let responseStatus = 0;

        await axios.post('https://armateam.ir/rest/shop/authenticate/', {
            action: 'USER_CREATE',
            name: name,
            phone: phone,
            password: password
        })
            .then((response) => {
                responseStatus = response.data.status
                setUserData((prevState) => ({ ...prevState, authStatus: response.data.status, data: { ...prevState.data, ...response.data } }))
                setIsLoading(false)
            })
            .catch((error) => {
                setIsLoading(false)
                console.log(error);
            });

        if (responseStatus === 201) {
            setIsLoggedIn(true)
            setUserData(prevState => ({ ...prevState, userStatus: 0, authStatus: 0 }))
        }
        else
            setIsLoggedIn(false)
    }

    const getAuthData = async ({ userName }) => {
        setIsLoading(true)

        await axios.post('https://armateam.ir/rest/shop/authenticate/', {
            action: 'USER_AUTH',
            username: userName
        })
            .then((response) => {
                setUserData((prevState) => ({ ...prevState, userStatus: response.data.status, data: { ...response.data } }))
                setIsLoading(false)
            })
            .catch((error) => {
                setUserData((prevState) => ({ ...prevState, userStatus: 404, data: {} }))
                setIsLoading(false)
                console.log(error);
            });
    }

    return (
        <AuthContext.Provider
            value={{
                isAuth: isLoggedIn,
                isLoading: isLoading,
                smsAuth: isSmsAuth,
                sign: userHandler,
                login: loginHandler,
                getAuthData: getAuthData,
                goBack: goBack,
                smsLogin: smsLogin,
                createAccount: createAccount,
                userData: userData
            }}
        >
            {props.children}
        </AuthContext.Provider>
    )
}

export default AuthContextProvider