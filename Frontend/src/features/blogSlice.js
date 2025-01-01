import { createSlice } from "@reduxjs/toolkit";

const blogSlice = createSlice({
    name: 'blog',
    initialState: {
        blogs: null
    },
    reducers: {
        addBlog: (state, action) => {
            state.blogs = action.payload
        },
        removeBlog: (state, action) => {
            state.blogs = null
        }
    }
})


export const { addBlog, removeBlog } = blogSlice.actions;
export default blogSlice.reducer;

