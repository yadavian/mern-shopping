import React from "react";
import { Navigate, Route, Routes } from 'react-router-dom'
// import Login from "../pages/auth/login/Login";
// import Register from "../pages/auth/register/Register";
// import SendOtp from "../pages/auth/send-otp/SendOtp";
// import ForgotPassword from "../pages/auth/forgot-password/ForgotPassword";
import Home from "../pages/user/home/Home";
import ViewProductList from "../pages/user/view-product-list/ViewProductList";
import ViewSingleProduct from "../pages/user/view-single-product/ViewSingleProduct";
import ChooseAddress from "../pages/user/choose-address/ChooseAddress";
import ChoosePaymentMode from "../pages/user/choose-payment-mode/ChoosePaymentMode";
import Congratulations from "../pages/user/congratulations/Congratulations";
import ViewOrders from "../pages/user/view-orders/ViewOrders";
import Cart from "../pages/user/cart/Cart";
import Header from "../components/header/Header";
import Profile from "../pages/user/profile/Profile";
import Category from "../pages/admin/category/Category";
import Product from "../pages/admin/product/Product";
import User from "../pages/admin/user/User";
import UserModify from "../pages/admin/user/UserModify";

export default function AppRouter() {
    return (
        <>
            <Header />
            <Routes>
                <Route path='/' element={<Navigate to='/home' />} />
                <Route path='/home' element={<Home />} />
                <Route path='/view-product-list' element={<ViewProductList />} />
                <Route path='/view-single-product/:productId' element={<ViewSingleProduct />} />
                <Route path='/cart' element={<Cart />} />
                <Route path='/choose-address' element={<ChooseAddress />} />
                <Route path='/choose-payment-mode' element={<ChoosePaymentMode />} />
                <Route path='/congratulations' element={<Congratulations />} />
                <Route path='/view-orders' element={<ViewOrders />} />
                <Route path='/profile' element={<Profile />} />

                {/* <Route path='/admin/category' element={<Category />} />
                <Route path='/admin/product' element={<Product />} />
                <Route path='/admin/user' element={<User />} />
                <Route path='/admin/user-modify' element={<UserModify />} /> */}

                {/* <Route path='/admin/user-modify/:userId' element={<UserModify />} /> */}
            </Routes>
        </>
    );
}
