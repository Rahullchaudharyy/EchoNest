import { createSlice } from "@reduxjs/toolkit";

const configSlice = createSlice({
    name:'config',
    initialState:{
        IsSearching : false
    },
    reducers:{
      setSearching:(state,action)=>{
        state.IsSearching = action.payload
      }  
    },

})


export const {setSearching } = configSlice.actions;
export default configSlice.reducer