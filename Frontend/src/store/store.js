import {configureStore } from '@reduxjs/toolkit'
import userReducer from '../features/UserSlice'
import blogReducer from '../features/blogSlice'
import categoryReducer from '../features/CategorySlice'
const store = configureStore({
    reducer:{
        user:userReducer,
        blogs:blogReducer,
        category:categoryReducer
    }
})


export default store