import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { setCartProducts, setCartQuantity } from '../redux/slices/cartSlice';

const useCartQuantity = (initialCount = 1) => {

    const [quantity, setQuantity] = useState(initialCount);
    const cart = useSelector(state => state.cart)
    const dispatch = useDispatch();

    const setCartQuantityByIndex = (quantity, product_id) => {
        if (quantity <= 0) {
            // To remove from the cart list
            let updateCartAfterRemoving = [];
            for (let i = 0; i < cart.products.length; i++) {
                console.log('i > ', cart.products[i]._id)
                if (product_id != cart.products[i]._id) {
                    updateCartAfterRemoving.push(cart.products[i])
                }
            }
            dispatch(setCartProducts(updateCartAfterRemoving))
        } else {
            setQuantity(quantity)
            let { products } = cart;
            var updatedProducts = JSON.parse(JSON.stringify(products))
            const index = updatedProducts.findIndex(product => product._id === product_id);
            if (index !== -1) {
                updatedProducts[index].quantity = quantity;
            };
            dispatch(setCartQuantity(updatedProducts))
        }
    }

    return [quantity, setCartQuantityByIndex]

}

export default useCartQuantity