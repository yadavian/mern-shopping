import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { setCart, setIsCartSelected } from '../../../redux/slices/homeSlice';
import CartItem from '../../../components/cart-item/CartItem';

const Cart = () => {
  const navigate = useNavigate();
  const cart = useSelector(state => state.cart)
  const dispatch = useDispatch();


  return (
    <div className='container'>
      <div className='row'>
        <div className='col-md-12'>
          <div className='view-orders-section'>
            <h3>Your Cart</h3>
            <hr />
            {cart.products && cart.products.map((d, i) => {
              return (
                <CartItem d={d} i={i} key={i} />
              )
            })
            }
            <div style={{ display: 'flex', justifyContent: 'center', marginTop: '5%' }}>
              <button className="btn btn-warning" onClick={() => {
                navigate('/choose-address');
                dispatch(setIsCartSelected(true))
              }}>Proceed to checkout</button>
            </div>
          </div>
        </div>
      </div>
    </div >
  )
}

export default Cart