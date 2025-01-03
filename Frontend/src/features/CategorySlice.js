import { createSlice } from "@reduxjs/toolkit";

const categorySlice = createSlice({
    name: 'categories',
    initialState: {
        category: null
    },
    reducers: {
        addcategory: (state, action) => {
            state.category = action.payload
        },
        removecategory: (state, action) => {
            state.category = null
        }
    }
})


export const { addcategory, removecategory } = categorySlice.actions;
export default categorySlice.reducer;

