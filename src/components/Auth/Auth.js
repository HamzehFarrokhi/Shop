import React from "react";
import { useNavigate } from "react-router-dom";
import Card from "../UI/Card/Card";
import Button from "../UI/Button/Button";
import './Auth.css'

const Auth = ({ link }) => {
    let navigate = useNavigate()
    return (
        <Card className="auth">
            <p>برای دسترسی به حساب لطفا ابتدا وارد شوید</p>
            <Button btnType="enter" click={() => navigate(`/login/?back_url=${link}`, { replace: true })}>ورود | ثبت نام</Button>
        </Card>
    )
}

export default Auth