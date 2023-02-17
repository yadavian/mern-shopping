import React, { useEffect } from "react";
import { BrowserRouter, Route, Routes, useNavigate } from 'react-router-dom'
// import { BrowserRouter, Link, Navigate, Route, Routes } from 'react-router-dom' 
import AuthRouter from "./AuthRouter";
import AppRouter from "./AppRouter";
import { useSelector } from "react-redux";
import ProtectedRoutes from "./ProtectedRoutes";
import PublicRoutes from "./PublicRoutes";
import AdminRouter from "./AdminRouter";

export default function RootRouter() {
    const login = useSelector(state => state.login);
    const navigate = useNavigate();
    console.log('login', login)

    useEffect(() => {
        if (login.data.length != 0) {
            if (login.data.isAdmin) {
                navigate('/admin')
            } else {
                navigate('/home')
            }
        }else{
            navigate('/auth/login')
        }
    }, [])


    return (
        <Routes>
            {/* <Route path='/auth/*' element={<PublicRoutes><AuthRouter /></PublicRoutes>} />
                <Route path='/admin/*' element={<ProtectedRoutes><AdminRouter /></ProtectedRoutes>} />
                <Route path='/*' element={<ProtectedRoutes><AppRouter /></ProtectedRoutes>} /> */}



            <Route path='/auth/*' element={<AuthRouter />} />
            <Route path='/admin/*' element={<AdminRouter />} />
            <Route path='/*' element={<AppRouter />} />


            {/* <Route path='/' element={<Navigate to='login' />} />
                <Route path='/login' element={<Login />} />
                <Route path='/register' element={<Register />} />
                <Route path='/send-otp' element={<SendOtp />} />
                <Route path='/forgot-password' element={<ForgotPassword />} />

                <Route path='/home' element={<Home />} />
                <Route path='/view-product-list' element={<ViewProductList />} />
                <Route path='/view-single-product' element={<ViewSingleProduct />} />
                <Route path='/cart' element={<Cart />} />
                <Route path='/choose-address' element={<ChooseAddress />} />
                <Route path='/choose-payment-mode' element={<ChoosePaymentMode />} />
                <Route path='/congratulations' element={<Congratulations />} />
                <Route path='/view-orders' element={<ViewOrders />} />
                <Route path='/profile' element={<Profile />} /> */}

        </Routes>
    );
}
