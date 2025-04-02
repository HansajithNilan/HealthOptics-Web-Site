import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    items: []
};

const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        addToCart(state, action) {
            const { spectacleId, quantity } = action.payload;
            const indexspectacleId = (state.items).findIndex(item=>item.spectacleId===spectacleId);

            if(indexspectacleId >=0){
                state.items[indexspectacleId].quantity+= quantity;
            }else{
                state.items.push({ spectacleId, quantity });
            }
           
        }
    }
});

// ✅ Export the action
export const { addToCart } = cartSlice.actions;

// ✅ Export the reducer
export default cartSlice.reducer;
