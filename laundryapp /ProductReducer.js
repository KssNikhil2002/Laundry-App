import { createSlice } from "@reduxjs/toolkit";

export const ProductSlice = createSlice({
  name: "product",
  initialState: {
    product: [],
  },
  reducers: {
    getProduct:(state, action) =>{
        state.product.push({...action.payload});
    },
    incrementQty:(state,action) => {
        const itemPresent = state.product.find((item) => item.id === action.payload.id);
        itemPresent.quantity++;
    },
    decrementQty:(state,action) => {
        const itemPresent = state.product.find((item) => item.id === action.payload.id);
        if(itemPresent.quantity == 1){
            itemPresent.quantity = 0;
            const removeItem = state.product.filter((item) => item.id !== action.payload.id);
            state.cart = removeItem;
        }else{
            itemPresent.quantity--;
        }
    },
    clearquantity:(state)=>{
      state.product.map((item)=> item.quantity = 0 );
    }
  },

});

// Action creators are generated for each case reducer function
export const { decrementQty,incrementQty,getProduct,clearquantity} = ProductSlice.actions;

export default ProductSlice.reducer;