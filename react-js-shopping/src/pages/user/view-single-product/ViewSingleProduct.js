// import { Diversity2TwoTone } from '@mui/icons-material'
import React, { useEffect, useState } from 'react'
import './ViewSingleProduct.css'
import MaterialSlideCarousel from '../home/components/material-slide-carousel/MaterialSlideCarousel'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import axios from 'axios'
import { setIsCartSelected } from '../../../redux/slices/homeSlice'
import { setCartProducts, setCartUserId } from '../../../redux/slices/cartSlice'
import { setCartSingleProduct } from '../../../redux/slices/singleCartSlice'
import useCartQuantity from '../../../hooks/useCartQuantity'

const ViewSingleProduct = () => {
    const [quantity, setCartQuantityByIndex] = useCartQuantity()
    const login = useSelector(state => state.login)
    const dispatch = useDispatch()
    let { productId } = useParams();
    const [product, setProduct] = useState([])
    const navigate = useNavigate()

    useEffect(() => {
        const getProductById = async () => {
            const { data: res } = await axios.get(
                `${process.env.REACT_APP_API_URL}/product/${productId}`,
                {
                    headers: {
                        "Content-Type": "multipart/form-data",
                        "Authorization": `Bearer ${login.token}`
                    }
                }
            )
            console.log('res', res)
            setProduct(res.data)
        }
        getProductById();
    }, [])

    const handleBuyNow = () => {
        // dispatch(setCartProducts(product))
        dispatch(setIsCartSelected(false))
        dispatch(setCartSingleProduct(product))
        dispatch(setCartUserId(login.data._id))
        navigate('/choose-address')
    }

    return (
        <div className='view-single-product'>
            <div style={{ display: "flex", justifyContent: 'space-between' }}>
                <div style={{ width: "50%", padding: "5rem" }}>
                    <MaterialSlideCarousel />
                </div>
                <div className='product-details-section'>
                    <p style={{ fontSize: "1.2rem" }}>{product.productName}</p>

                    <h4>&#8377; {product.prize}</h4>

                    <ul>
                        <li dangerouslySetInnerHTML={{ __html: product.productDescription }} />
                    </ul>

                    <button className='btn btn-light'>See all details</button>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: "2rem" }}>
                        <button className='btn btn-warning' onClick={() => setCartQuantityByIndex(quantity + 1, product._id)}>Add To Cart</button>
                        <button className='btn btn-success' onClick={handleBuyNow}>Buy Now</button>
                        {/* <Link to='/choose-address' className='btn btn-success'>Buy Now</Link> */}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ViewSingleProduct