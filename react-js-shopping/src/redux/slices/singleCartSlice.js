import { createSlice, current } from "@reduxjs/toolkit";

export const singleCartSlice = createSlice({
    name: "home",
    initialState: {
        userId: "",
        address: {},
        amount: 0,
        status: "IN-CART",
        products: [],
        paymentMode: ""
    },
    reducers: {
        setCartSingleProduct: (state, action) => {
            state.products = action.payload;
        },
        setCartSingleProductAddress: (state, action) => {
            state.address = action.payload;
        },
        setCartSingleProductPaymentMode: (state, action) => {
            state.paymentMode = action.payload;
        },
        setCartUserId: (state, action) => {
            state.userId = action.payload;
        },
         

    },
});

export const { setCartSingleProduct, setCartSingleProductAddress, setCartSingleProductPaymentMode, setCartUserId } = singleCartSlice.actions;
export default singleCartSlice.reducer;