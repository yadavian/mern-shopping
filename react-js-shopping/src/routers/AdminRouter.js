import React from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'
import Header from '../components/header/Header'
import Category from '../pages/admin/category/Category'
import CategoryModify from '../pages/admin/category/CategoryModify'
import CategoryPage from '../pages/admin/category/CategoryPage'
import Product from '../pages/admin/product/Product'
import ProductModify from '../pages/admin/product/ProductModify'
import ProductPage from '../pages/admin/product/ProductPage'
import User from '../pages/admin/user/User'
import UserModify from '../pages/admin/user/UserModify'

const AdminRouter = () => {
    return (
        <>
            <Header />
            <Routes>
                <Route path='/' element={<Navigate to='/admin/product' />} />
                <Route path='/category' element={<CategoryPage />} />
                <Route path='/category-modify' element={<CategoryModify />} />
                <Route path='/product-modify' element={<ProductModify />} />
                <Route path='/product' element={<ProductPage />} />
                <Route path='/user' element={<User />} />
                <Route path='/user-modify' element={<UserModify />} />
                {/* <Route path='/admin/user-modify/:userId' element={<UserModify />} /> */}
            </Routes>
        </>
    )
}

export default AdminRouter