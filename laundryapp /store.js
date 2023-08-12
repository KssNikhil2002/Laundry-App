import { configureStore } from "@reduxjs/toolkit";
import CartReducer from "./CartReducer";
import ProductReducer, { ProductSlice } from "./ProductReducer";

export default configureStore(
    {
        reducer:{
            cart:CartReducer,
            product:ProductReducer,
        }
    }
)