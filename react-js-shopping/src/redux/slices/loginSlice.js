import { createSlice } from "@reduxjs/toolkit";

export const loginSlice = createSlice({
    name: "login",
    initialState: {
        userType: "",
        data: [],
        isLoggedIn: false,
        token: null
    },
    reducers: {
        setData: (state, action) => {
            state.data = action.payload;
            // console.log(current(state.data));
        },
        setUserType: (state, action) => {
            state.userType = action.payload;
        },
        setisLoggedIn: (state, action) => {
            // console.log('state', state) // current slice ke state ko represent kar raha h
            // console.log('action', action) // type(kaun sa function call hua uska naam) + payload(jo bheja h data wo aata hai)
            state.isLoggedIn = action.payload.isLoggedIn;
            state.token = action.payload.token;
            state.data = action.payload.data;
            state.userType = action.payload.isAdmin
        },
    },
});

export const { setloginData, setData, setUserType, setisLoggedIn } =
    loginSlice.actions;
export default loginSlice.reducer;