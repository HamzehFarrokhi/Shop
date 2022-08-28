import React, { useState } from "react";
import axios from '../axios/axios'

export const ForgetContext = React.createContext({
    isAuth: false,
    isLoading: false,
    smsAuth: false,
    sign: () => { },
    goBack: () => { },
    smsLogin: () => { },
    changePassword: () => { },
    forgetData: {
        userStatus: 0,
        authStatus: 0,
        data: {
            name: '',
            phone: 0,
            email: '',
            address: '',
            varified: 0
        }
    }
})

const ForgetContextProvider = (props) => {
    const [isLoggedIn, setIsLoggedIn] = useState(false)
    const [isLoading, setIsLoading] = useState(false)
    const [isSmsAuth, setIsSmsAuth] = useState(false)
    const [forgetData, setForgetData] = useState({ userStatus: 0, authStatus: 0, data: {} })

    const userHandler = async ({ username }) => {
        setIsLoading(true)
        
        await axios.post('https://armateam.ir/rest/shop/forget/', {
            action: 'USER_CHECK',
            username: username
        })
            .then((response) => {
                setForgetData((prevState) => ({ ...prevState, userStatus: response.data.status, data: { ...prevState.data } }))
                setIsLoading(false)
            })
            .catch((error) => {
                setForgetData((prevState) => ({ ...prevState, userStatus: 404, data: {} }))
                setIsLoading(false)
                console.log(error);
            });
    }

    const goBack = () => {
        setIsSmsAuth(false)
        setForgetData(prevState => ({ ...prevState, userStatus: 0, authStatus: 0 }))
    }

    const smsLogin = () => {
        setIsSmsAuth(true)
    }

    const changePassword = async ({ phone, password }) => {
        setIsLoading(true)
        let responseStatus = 0;

        await axios.post('https://armateam.ir/rest/shop/forget/', {
            action: 'CHANGE_PASS',
            phone: phone,
            password: password
        })
            .then((response) => {
                responseStatus = response.data.status
                setForgetData((prevState) => ({ ...prevState, authStatus: response.data.status, data: { ...prevState.data, ...response.data } }))
                setIsLoading(false)
            })
            .catch((error) => {
                setIsLoading(false)
                console.log(error);
            });

        console.log(responseStatus)
        if (responseStatus === 200) {
            setIsLoggedIn(true)
            setForgetData(prevState => ({ ...prevState, userStatus: 0, authStatus: 0 }))
        }
        else {
            setIsLoggedIn(false)
            setForgetData(prevState => ({ ...prevState, userStatus: 0, authStatus: 404 }))
        }
    }

    return (
        <ForgetContext.Provider
            value={{
                isAuth: isLoggedIn,
                isLoading: isLoading,
                smsAuth: isSmsAuth,
                sign: userHandler,
                goBack: goBack,
                smsLogin: smsLogin,
                changePassword: changePassword,
                forgetData: forgetData
            }}
        >
            {props.children}
        </ForgetContext.Provider>
    )
}

export default ForgetContextProvider