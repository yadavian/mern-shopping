import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import ProductItem from '../../../components/product-item/ProductItem' 
import './ViewProductList.css'
import axios from 'axios'
import { useLocation, useNavigate } from 'react-router-dom'

const ViewProductList = () => {
    const navigate = useNavigate();
    let { state: params } = useLocation();
    // console.log('params', params)

    const login = useSelector(state => state.login)
    const [products, setProducts] = useState([])

    React.useEffect(() => {
        const getProducts = async () => {
            const { data: res } = await axios.get(
                // `${process.env.REACT_APP_API_URL}/product/${params != null ? params.categoryName : ""}`,
                `${process.env.REACT_APP_API_URL}/product${params != null ? "?categories=" + params.categoryName : ""}`,
                {
                    headers: {
                        "Content-Type": "multipart/form-data",
                        "Authorization": `Bearer ${login.token}`
                    }
                }
            )
            // console.log('res', res)
            setProducts(res.data)
        }
        getProducts();
    }, [params])

    return (
        <div className='container'>
            <div className='row'>
                {products?.map((d, i) => {
                    return (
                        <div className='col-md-12' key={d.product_id}>
                            <ProductItem data={d} />
                        </div>
                    )
                })}
            </div>
        </div>
    )
}

export default ViewProductList