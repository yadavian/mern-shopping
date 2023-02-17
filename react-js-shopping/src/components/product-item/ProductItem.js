import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import classes from './product-item.module.css'
import gClasses from '../../assets/css/global.module.css'
import COLORS from '../../constants/Colors'
import { MdDeleteForever } from 'react-icons/md';
import { setCartProducts, setCartQuantity, setCartUserId } from '../../redux/slices/cartSlice'
import useCartQuantity from '../../hooks/useCartQuantity'

const ProductItem = ({ data }) => {
    const home = useSelector(state => state.home)
    const login = useSelector(state => state.login)
    const cart = useSelector(state => state.cart)
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const [isExistInCart, setisExistInCart] = useState(false)
    const [quantity, setCartQuantityByIndex] = useCartQuantity(1)
    const [changedQuantity, setChangedQuantity] = useState(1)

    const handleAddToCart = async (productId) => {
        const res = await fn_checkDuplicateProductInCart(productId);
        if (!res) {
            await fn_addToCart(productId);
        }
    }

    const fn_checkDuplicateProductInCart = async (productId) => {
        for (let i = 0; i < cart.products.length; i++) {
            if (cart.products[i]._id == productId) {
                return true;
            }
        }
    }

    const fn_addToCart = async (productId) => {
        const { data: res } = await axios.get(
            `${process.env.REACT_APP_API_URL}/product/${productId}`,
            {
                headers: {
                    "Content-Type": "multipart/form-data",
                    "Authorization": `Bearer ${login.token}`
                }
            },
        );
        const updatedProduct = { ...res.data, quantity: 1, productTotalPrice: res.data.prize }
        const updatedCart = [...cart.products, updatedProduct];
        // dispatch(setCart(updatedCart))
        dispatch(setCartProducts(updatedCart))
        dispatch(setCartUserId(login.data._id))
    }


    useEffect(() => {
        (
            async () => {
                const res = await fn_checkDuplicateProductInCart(data._id);
                const resp = cart.products.filter((product) => {
                    return product._id === data._id;
                })
                // console.log('resp', resp)
                setChangedQuantity(resp[0].quantity)
                if (res) {
                    setisExistInCart(true)
                } else {
                    setisExistInCart(false)
                }
            }
        )();
    }, [cart.products])

    console.log('changedQuantity', changedQuantity)


    return (
        <div className={`${classes.product__item} ${gClasses.fbc}`}>

            <img
                src={`http://${process.env.REACT_APP_SERVER_IP}:${process.env.REACT_APP_SERVER_PORT}/${data.productImages}`}
                style={{ width: '150px', height: '150px', alignSelf: 'center' }} alt='product'
            />
            <div className={`${gClasses.fc} ${gClasses.ai__start}`} style={{ maxWidth: "35vw" }}>
                <h5>{data.productName}</h5>
                <h5>&#8377;{data.prize}</h5>
                <p dangerouslySetInnerHTML={{ __html: data.productDescription }} />
            </div>

            <div className={`${gClasses.fc} ${gClasses.ai__end}`}>
                <Link to={`/view-single-product/${data._id}`} className='btn ' style={{ backgroundColor: COLORS.PRIMARY, color: "white" }} >View Details</Link>
                {
                    isExistInCart ?
                        <>
                            {/* <button
                                className='btn  mt-1'
                                style={{ backgroundColor: COLORS.SECONDARY, color: "white" }}
                                onClick={() => handle_removeFromCart(data._id)}>
                                Remove From Cart
                            </button> */}
                            <div className="btn-group mt-1" role="group" aria-label="Basic example">
                                {/* <button type="button" className="btn btn-warning">-</button> */}
                                {quantity <= 1
                                    ?
                                    <button type="button"
                                        className='btn'
                                        style={{ backgroundColor: COLORS.PRIMARY, color: 'white' }}
                                        onClick={() => {
                                            // handle_removeFromCart(data._id)
                                            setCartQuantityByIndex(0, data._id)
                                        }
                                        }
                                    >
                                        <MdDeleteForever />
                                    </button>
                                    : <button type="button" className="btn btn-warning" onClick={() => {
                                        if (quantity > 0) {
                                            setCartQuantityByIndex(quantity - 1, data._id)
                                        }
                                    }}>-</button>

                                }
                                <button type="button" className="btn btn-info">{changedQuantity}</button>
                                <button type="button"
                                    className="btn btn-warning"
                                    onClick={() => setCartQuantityByIndex(quantity + 1, data._id)}
                                >+</button>
                            </div>
                        </>
                        :
                        <button
                            className='btn  mt-1'
                            style={{ backgroundColor: COLORS.SECONDARY, color: "white" }}
                            onClick={() => handleAddToCart(data._id)}>
                            Add To Cart
                        </button>

                }
            </div>
        </div >
    )
}

export default ProductItem