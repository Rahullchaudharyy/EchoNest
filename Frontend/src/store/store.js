import {configureStore } from '@reduxjs/toolkit'
import userReducer from '../features/UserSlice'
import blogReducer from '../features/blogSlice'
import categoryReducer from '../features/CategorySlice'
import loadingReducer from '../features/LoadingSlice'

const store = configureStore({
    reducer:{
        user:userReducer,
        blogs:blogReducer,
        category:categoryReducer,
        loading:loadingReducer
    }
})


export default store