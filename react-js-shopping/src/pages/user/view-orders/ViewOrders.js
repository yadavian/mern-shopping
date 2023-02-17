import { colors } from '@mui/material'
import { alignProperty } from '@mui/material/styles/cssUtils'
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import './ViewOrders.css'

const ViewOrders = () => {
    const login = useSelector(state => state.login)
    const [orders, setOrders] = useState([])

    useEffect(() => {
        getOrders()
    }, [])

    const getOrders = async () => {
        try {
            const { data: res } = await axios.get(
                `${process.env.REACT_APP_API_URL}/order/${login.data._id}`,
                {
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": `Bearer ${login.token}`
                    }
                }
            );
            console.log('res.data======', res.data)
            var cloneArray = JSON.parse(JSON.stringify(res.data))
            // setOrders(res.data)
            const result = await fn_fetchAllProducts(cloneArray)

            console.log('result.data======', result)
            setOrders(result)

        } catch (error) {
            console.log('error', error)
        }
    }

    const fn_getProducts = async (productId) => {
        try {
            const { data: res } = await axios.get(
                `${process.env.REACT_APP_API_URL}/product/${productId}`,
                {
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": `Bearer ${login.token}`
                    }
                }
            );
            return res.data
        } catch (error) {
            console.log('error', error)
        }
    }


    const fn_deleteOrder = async (productId) => {
        try {
            const { data: res } = await axios.delete(
                `${process.env.REACT_APP_API_URL}/product/${productId}`,
                {
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": `Bearer ${login.token}`
                    }
                }
            );
            if (res.success) {
                alert(res.msg)
                getOrders()
            } else {
                alert(res.msg)
            }
        } catch (error) {
            console.log('error', error)
        }
    }

    const fn_fetchAllProducts = async (resData) => {
        console.log('resData=======', resData)
        let fullProducts = []
        for (let i = 0; i < resData.length; i++) {
            for (let j = 0; j < resData[i].products.length; j++) {
                let data = await fn_getProducts(resData[i].products[j]._id)

                console.log('-----------------------------')
                console.log('product data', data._id)
                console.log('resData[i].products', resData[i].products)

                const index = resData[i].products.findIndex(obj => obj._id === data._id);
                console.log('index', index)
                if (index != -1) {
                    console.log('data', data)
                    resData[i].products[index] = { ...data, quantity: resData[i].products[index].quantity, productTotalPrice: data.prize * resData[i].products[index].quantity }
                    fullProducts = resData
                }
                // console.log('orders[i].products', orders[i].products.findIndex(data._id))
            }

            // setOrders(fullProducts)
            console.log('##################################')
        }
        fullProducts = resData

        console.log('fullProducts', fullProducts)
        return fullProducts
    }


    console.log('orders', orders)


    return (
        <div className='container'>
            <div className='row'>
                <div className='col-md-12'>
                    <div className='view-orders-section'>
                        <h3>Your Orders</h3>
                        <hr />
                        {
                            orders ? orders.map((d, i) => {
                                return (
                                    <div className='view-orders-box my-5' key={d._id}>
                                        <div className='view-order-box-title' >
                                            <p> {i + 1}. ORDER PLACED</p>
                                            <p>{d._id}</p>
                                        </div>
                                        {d.products[0].hasOwnProperty('productImages') && d.products.map((p, ip) => {
                                            return (
                                                <Link to={`/view-single-product/${p._id}`} className='view-order-box-desc' key={p._id} style={{ display: 'flex', borderRadius: 0, borderTop: "none", textDecoration: 'none', color: 'black' }}>
                                                    <img src={`http://${process.env.REACT_APP_SERVER_IP}:${process.env.REACT_APP_SERVER_PORT}/${p.productImages}`} alt='product' style={{ width: 100, height: 100 }} />
                                                    <div style={{ padding: "0rem 2rem" }}>
                                                        <p>{p.productName}</p>
                                                        <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: "1rem" }}>
                                                            <strong>Quantity : {p.quantity} </strong>
                                                            <strong>{p.quantity} Item's Prize : ₹ {p.productTotalPrice}</strong>
                                                        </div>
                                                    </div>
                                                    <div style={{ textAlign: "right" }}>
                                                        <button className='btn btn-warning mb-3'>Get product support</button>
                                                        <button className='btn btn-warning mb-3'>leave seller feedback</button>
                                                        <button className='btn ' style={{ backgroundColor: 'red', color: 'white' }}>Remove Froms Order</button>
                                                    </div>
                                                </Link>
                                            )
                                        })}
                                        <div className='view-order-box-bottom'  >
                                            <button className='btn '
                                                onClick={() => fn_deleteOrder(d._id)}
                                                style={{ backgroundColor: 'red', color: 'white' }}>Remove</button>
                                            <p style={{ fontWeight: 'bold' }}>TOTAL AMOUNT : ₹{d.amount}</p>
                                        </div>
                                    </div>
                                )
                            }) : <h1>No Orders</h1>
                        }
                    </div>

                </div>
            </div>
        </div>
    )
}

export default ViewOrders