import { createSlice, current } from "@reduxjs/toolkit";

export const homeSlice = createSlice({
    name: "home",
    initialState: {
        activeUserType: "employee",
        loading: false,
        // productToBuy: {},
        isCartSelected: false
        // cart: [

        // ],
        // order: {},
        // masterCart: {
        //     userId: "",
        //     amount: "",
        //     address: {},
        //     status: "IN-CART",
        //     products: [
        //         {
        //             product: {},
        //             quantity: 1,
        //             productTotalPrize: 0
        //         }
        //     ]
        // }


    },
    reducers: {
        setActiveUserType: (state, action) => {
            state.activeUserType = action.payload;
        },
        // setProductToBuy: (state, action) => {
        //     state.productToBuy = action.payload
        // },
        setCart: (state, action) => {
            // console.log('action.payload', action.payload)
            // console.log("current(state.cart)", current(state.cart));
            // const currentCart = current(state.cart);
            // console.log('currentCart', Array.isArray(currentCart))
            // let updatedCart = [...currentCart, action.payload]
            // console.log('updatedCart', Array.isArray(updatedCart))
            // state.cart = updatedCart
            state.cart = action.payload
        },
        // TODO : NOT WORKS WHRN NESTED REDUX 
        // setMasterCart: (state, action) => {
        //     state.masterCart.products = action.payload
        // },
        setOrder: (state, action) => {
            state.order = action.payload
        },
        setIsCartSelected: (state, action) => {
            state.isCartSelected = action.payload
        },
        showLoading: (state) => {
            state.loading = true;
        },
        hideLoading: (state) => {
            state.loading = false;
        },
    },
});

export const { setActiveUserType, showLoading, hideLoading, setProductToBuy, setCart, setMasterCart, setOrder, setIsCartSelected } = homeSlice.actions;
export default homeSlice.reducer;