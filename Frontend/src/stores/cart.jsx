import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    items: [],
    statusTab:false
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
           
        },
        changeQuantity(state, action) {
            const { spectacleId, quantity } = action.payload;
            const indexspectacleId = (state.items).findIndex(item=>item.spectacleId===spectacleId);
            if(quantity >0){
                state.items[indexspectacleId].quantity= quantity;
            }
            else{
              state.items = (state.items).filter(item=>item.spectacleId!==spectacleId);
            }
            
        },
        toggleStatusTab(state){
          if(state.statusTab === false){
            state.statusTab = true;
          }else{
            state.statusTab = false;
          }
        }
    }
});

// ✅ Export the action
export const { addToCart ,changeQuantity,toggleStatusTab} = cartSlice.actions;

// ✅ Export the reducer
export default cartSlice.reducer;
