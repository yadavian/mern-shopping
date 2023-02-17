
// TODO : BEFORE REDUX PERSIST
// import { configureStore } from "@reduxjs/toolkit";
// import loginReducer from "./slices/loginSlice";
// import homeReducer from "./slices/homeSlice";

// export default configureStore({
//     reducer: {
//         login: loginReducer,
//         home: homeReducer,
//     },
// });

// TODO : AFTER REDUX PERSIST
import { configureStore } from "@reduxjs/toolkit";
import { persistReducer, persistStore } from "redux-persist";
import storage from "redux-persist/lib/storage";
import { combineReducers } from "redux";
import loginReducer from "./slices/loginSlice";
import homeReducer from "./slices/homeSlice";
import cartReducer from "./slices/cartSlice";
import singleCartReducer from "./slices/singleCartSlice";


const rootReducer = combineReducers({
    login: loginReducer,
    home: homeReducer,
    cart : cartReducer,
    singleCart : singleCartReducer,
});

const persistConfig = {
    key: "root",
    storage,
    // whitelist: ["auth"],
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
    reducer: persistedReducer
});

export const persistor = persistStore(store);
export default store


