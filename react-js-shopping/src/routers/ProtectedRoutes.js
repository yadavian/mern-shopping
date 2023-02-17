import React from 'react'
import { useSelector } from 'react-redux'
import { Navigate, useNavigate } from 'react-router-dom'

const ProtectedRoutes = (props) => {
    const login = useSelector(state => state.login)
    const navigate = useNavigate()

    // TODO : call api for validation token
    if (login.token) {
        return props.children
    } else {
        return <Navigate to='/auth/login' />
    }
}

export default ProtectedRoutes