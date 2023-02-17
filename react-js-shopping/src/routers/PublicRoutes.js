import React from 'react'
import { useSelector } from 'react-redux'
import { Navigate, useNavigate } from 'react-router-dom'

const PublicRoutes = (props) => {
    const login = useSelector(state => state.login)
    const navigate = useNavigate()

    // TODO : call api for validation token 
    if (login.token) {
        if (login.isAdmin)
            return <Navigate to='/admin' />
        else
            return <Navigate to='/home' />

    } else {
        return props.children
    }
}

export default PublicRoutes