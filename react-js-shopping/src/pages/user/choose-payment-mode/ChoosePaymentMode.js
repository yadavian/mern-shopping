import axios from 'axios'
import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import { resetCart, setCartProductPaymentMode } from '../../../redux/slices/cartSlice'
import { setCartSingleProductPaymentMode } from '../../../redux/slices/singleCartSlice'

const ChoosePaymentMode = () => {
    const home = useSelector(state => state.home)
    const login = useSelector(state => state.login)
    const cart = useSelector(state => state.cart)
    const singleCart = useSelector(state => state.singleCart)
    const [cartData, setCartData] = useState([])
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const [selectedPaymentMode, setSelectedPaymentMode] = useState("")

    console.log('cartData', cartData)

    const handle_placeOrder = async () => {
        if (Object.keys(selectedPaymentMode).length > 0) {
            // let cartData = []
            if (home.isCartSelected) {
                dispatch(setCartProductPaymentMode(selectedPaymentMode))
                setCartData(cart)
                // return
            } else {
                dispatch(setCartSingleProductPaymentMode(selectedPaymentMode))
                setCartData(singleCart)
            }
            try {
                const { data: res } = await axios.post(
                    `${process.env.REACT_APP_API_URL}/order`,
                    cartData,
                    {
                        headers: {
                            "Content-Type": "application/json",
                            "Authorization": `Bearer ${login.token}`
                        }
                    },
                )
                console.log('res', res)
                if (res.success) {
                    alert(res.msg)
                    if (home.isCartSelected) {
                    } else {
                        dispatch(setCartSingleProductPaymentMode(selectedPaymentMode))
                    }
                    dispatch(resetCart())
                    navigate('/congratulations')
                } else {
                    alert(res.msg)
                }

            } catch (error) {
                console.log('error', error)
            }
        } else {
            alert("Please select")
        }




    }

    return (
        <div className='container'>
            <div className='row'>
                <div className='col-md-12'>

                    <div className='choose-address-section'>
                        <h3 style={{ color: "#c45500" }}>Select Payment Mode</h3>
                        <div className='choose-address-box'>
                            <h5>Payment Modes</h5>
                            <hr />
                            <div className="form-check address-item-box" style={{ backgroundColor: "#fcf5ee", margin: "2rem  0rem" }}>
                                <input type="radio" className="form-check-input" name="paymentMode" value="Cash on Delivery" onChange={() => setSelectedPaymentMode("Cash on Delivery")} />
                                <label className="form-check-label"><strong>Cash on Delivery</strong></label>
                            </div>
                            <div className="form-check address-item-box" style={{ backgroundColor: "#fcf5ee", margin: "2rem  0rem" }}>
                                <input type="radio" className="form-check-input" name="paymentMode" value="Online Payment Gateway" onChange={() => setSelectedPaymentMode("Online Payment Gateway")} />
                                <label className="form-check-label"><strong>Online Payment Gateway</strong></label>
                            </div>
                            <div style={{ textAlign: 'center' }}>
                                <button className='btn btn-warning' onClick={handle_placeOrder}>Place Your Order and Pay</button>
                                {/* <Link to='/congratulations' className='btn btn-warning'>Place Your Order and Pay</Link> */}
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    )
}

export default ChoosePaymentMode