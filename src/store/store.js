import {configureStore } from '@reduxjs/toolkit'
import userReducer from '../features/userSlice.js'
import blogReducer from '../features/blogSlice'
import categoryReducer from '../features/CategorySlice'
import loadingReducer from '../features/LoadingSlice'
import configReducer from '../features/ConfigSlice.js'

const store = configureStore({
    reducer:{
        user:userReducer,
        blogs:blogReducer,
        category:categoryReducer,
        loading:loadingReducer,
        config:configReducer
    }
})


export default store