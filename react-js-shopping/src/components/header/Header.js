import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import IMG_amazon_PNG25 from '../../images/kotak-logo.png'
import './Header.css'
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';
import { Badge } from '@mui/material';
import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined';
import LogoutOutlinedIcon from '@mui/icons-material/LogoutOutlined';
import { useDispatch, useSelector } from 'react-redux';
import { setisLoggedIn } from '../../redux/slices/loginSlice';
// import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined';
import styles from '../../assets/css/global.module.css'
import { color } from '@mui/system';

const Header = () => {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const home = useSelector(state => state.home)
    const cart = useSelector(state => state.cart)
    const login = useSelector(state => state.login)
    const [headerLinks, setHeaderLinks] = useState([])

    const handleOnLogout = () => {
        dispatch(setisLoggedIn({
            isLoggedIn: false,
            token: null
        }))
        navigate('/auth/login')
    }

    const adminLinks = [
        {
            id: 1, link: "/admin/product",
            params: null,
            titleIcon: "Products"
        },
        {
            id: 2, link: "/admin/user",
            params: null,
            titleIcon: "Users"
        },
        {
            id: 1, link: "/admin/category",
            params: null,
            titleIcon: "Category"
        },
    ]

    const userLinks = [
        {
            id: 1, link: "/view-product-list",
            params: null,
            titleIcon: "View Products"
        },
        {
            id: 2, link: "/view-orders",
            params: null,
            titleIcon: "Orders"
        },
        {
            id: 3,
            link: "/cart",
            params: null,
            titleIcon: <Badge badgeContent={cart.products.length} color="secondary">
                <ShoppingCartOutlinedIcon color="primary" />
            </Badge>
        },
        {
            id: 4,
            link: "/profile",
            params: null,
            titleIcon: <AccountCircleOutlinedIcon color="primary" />
        },
    ];

    useEffect(() => {
        if (login.data != undefined) {
            if (login.data.isAdmin) {
                setHeaderLinks(adminLinks)
            }
            else {
                setHeaderLinks(userLinks)
            }
        }
    }, [cart])



    return (
        <header>
            <div className='header-section'>
                <Link to={'/'} className={styles.fsc}>
                    <img src={IMG_amazon_PNG25} style={{ height: 40 }} alt="amazon.com" />
                </Link>
                {/* <div className='header-items'>
                    <Link to={'/home'} >
                        Home<HomeOutlinedIcon color="primary" />
                    </Link>
                    <Link to={'/view-product-list'} >View Products</Link>
                    <Link to={'/view-orders'} >Orders</Link>
                    <Link to={'/cart'} >
                        <Badge badgeContent={home.cart.length} color="secondary">
                            <ShoppingCartOutlinedIcon color="primary" />
                        </Badge>
                    </Link>
                    <Link to={'/profile'} >
                        <AccountCircleOutlinedIcon color="primary" />
                    </Link>
                    <a><LogoutOutlinedIcon color="primary" onClick={handleOnLogout} /></a>
                </div> */}
                <div className='header-items'>
                    {/* {login.isLoggedIn && <a style={{ color: 'white' }}>{login.data != undefined && login.data.isAdmin ? "Admin" : " User"} Home</a>} */}

                    {headerLinks?.map((d, i) => {
                        return (
                            <Link to={d.link} key={i} params={d.params} >
                                {d.titleIcon}
                            </Link>
                        )
                    })}
                    {login.isLoggedIn && <a><LogoutOutlinedIcon color="primary" onClick={handleOnLogout} /></a>}


                </div>
            </div>
        </header >
    )
}

export default Header