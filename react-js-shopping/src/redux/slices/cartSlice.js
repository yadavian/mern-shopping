import { createSlice, current } from "@reduxjs/toolkit";


export const cartSlice = createSlice({
    name: "cart",
    initialState: {
        userId: "",
        address: {},
        amount: 0,
        status: "IN-CART",
        products: [],
        paymentMode: ""
    },
    reducers: {
        // ADD SELECTED PRODUCT INTO REDUX
        setCartProducts: (state, action) => {
            state.products = action.payload;
        },
        // ADD ADDRESS IN REDUX OBJECT
        setCartProductAddress: (state, action) => {
            state.address = action.payload;
        },
        // ADD PAYMENT MODE IN REDUX OBJECT
        setCartProductPaymentMode: (state, action) => {
            state.paymentMode = action.payload;
        },
        // STORES USER_ID IN REDUX OBJECT TO KNOW WHOSE USER IS ADDING ITEMS IN CART 
        setCartUserId: (state, action) => {
            state.userId = action.payload;
        },
        setCartQuantity: (state, action) => {
            state.products = action.payload;
        },
        resetCart: (state, action) => {
            state.userId = "";
            state.address = {};
            state.amount = 0;
            state.status = "IN-CART";
            state.products = [];
            state.paymentMode = "";
        }
    },
});

export const { setCartProducts, setCartProductAddress, setCartProductPaymentMode, setCartUserId, setCartQuantity,resetCart } = cartSlice.actions;
export default cartSlice.reducer;