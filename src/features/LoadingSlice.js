import {createSlice} from '@reduxjs/toolkit'

const loadingSlice = createSlice({
    name:'loading',
    initialState:{
        loading:true
    },
    reducers:{
        SetLoading:(state,action)=>{
            state.loading = action.payload
        }
    }
})

export const {SetLoading} =loadingSlice.actions ;
export default loadingSlice.reducer ;

