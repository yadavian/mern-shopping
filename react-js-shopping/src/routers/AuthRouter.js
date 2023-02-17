import React from "react";
import { Navigate, Route, Routes } from 'react-router-dom'
import Login from "../pages/auth/login/Login";
import Register from "../pages/auth/register/Register";
import SendOtp from "../pages/auth/send-otp/SendOtp";
import ForgotPassword from "../pages/auth/forgot-password/ForgotPassword";
import Header from "../components/header/Header";

export default function AuthRouter() {
    return (
        <>
            <Header />
            <Routes>
                <Route path='/' element={<Navigate to='/auth/login' />} />
                <Route path='/login' element={<Login />} />
                <Route path='/register' element={<Register />} />
                <Route path='/send-otp' element={<SendOtp />} />
                <Route path='/forgot-password' element={<ForgotPassword />} />
            </Routes>
        </>
    );
}
