import { createSlice } from "@reduxjs/toolkit";

const configSlice = createSlice({
    name:'config',
    initialState:{
        IsSearching : false,
        CurrentError:null
    },
    reducers:{
      setSearching:(state,action)=>{
        state.IsSearching = action.payload
      },
      setError:(state,action)=>{
        state.CurrentError = action.payload
      },
      removeError:(state,action)=>{
        state.CurrentError = null
      }
    },

})


export const {setSearching } = configSlice.actions;
export default configSlice.reducer