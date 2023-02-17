import React, { useEffect, useState } from 'react'
import { MdDeleteForever } from 'react-icons/md';
import { useDispatch, useSelector } from 'react-redux';
import COLORS from '../../constants/Colors';
import useCartQuantity from '../../hooks/useCartQuantity';
import { setCartQuantity } from '../../redux/slices/cartSlice';
import { setCart } from '../../redux/slices/homeSlice';

const CartItem = ({ d, i }) => {

    const home = useSelector(state => state.home)
    const cart = useSelector(state => state.cart)
    const [quantity, setCartQuantityByIndex] = useCartQuantity(1)
    const dispatch = useDispatch();
    const [selectedProduct, setSelectedProduct] = useState("")

    return (
        <div className='view-orders-box mt-3' key={i}>
            <div className='view-order-box-title' >
                <p>{d.productName}</p>
                <p>PRIZE : {d.size} </p>
            </div>
            <div className='view-order-box-desc' style={{ display: 'flex' }}>
                <img src={`http://${process.env.REACT_APP_SERVER_IP}:${process.env.REACT_APP_SERVER_PORT}/${d.productImages}`} style={{ width: 100, height: 100 }} alt='product' />
                <div style={{ maxWidth: '50vw' }}>
                    <p dangerouslySetInnerHTML={{ __html: d.productDescription }} />
                    {/* <p>{d.productDescription} - color : {d.color} - size : {d.size} - discount : {d.discount}</p> */}
                    {/* <p>pTron Solero M241 2.4A Micro USB Data & Charging Cable, Made in India, 480Mbps Data Sync, Durable 1-Meter Long USB Cable for Micro USB Devices - (Black)</p> */}
                </div>
                <div>
                    <div className="btn-group" role="group" aria-label="Basic example">
                        {quantity <= 1
                            ?
                            <button type="button"
                                className='btn'
                                style={{ backgroundColor: COLORS.PRIMARY, color: 'white' }}
                                onClick={() => {
                                    // handle_removeFromCart(d._id);
                                    setCartQuantityByIndex(0, d._id)
                                }}
                            >
                                <MdDeleteForever />
                            </button>
                            : <button
                                type="button"
                                className="btn btn-warning"
                                onClick={() => setCartQuantityByIndex(quantity - 1, d._id)}
                            >-</button>
                        }

                        <button
                            type="button"
                            className="btn btn-info">{d.quantity}</button>
                        <button
                            type="button"
                            className="btn btn-warning"
                            onClick={() => setCartQuantityByIndex(quantity + 1, d._id)}
                        >+</button>
                    </div>

                </div>
            </div>
        </div>
    )
}

export default CartItem