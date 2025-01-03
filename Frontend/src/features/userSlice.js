import { createSlice } from '@reduxjs/toolkit';

const userSlice = createSlice({
  name: 'user', // Name of the slice
  initialState: { currentUser: null, isLoggedIn: false }, // Initial state
  reducers: {
    login: (state, action) => {
        // console.log('This log is from the redux action.payload ', action.payload)
        // console.log('This log is from the redux action ', action)
      state.currentUser = action.payload; 
      state.isLoggedIn = true;
    },
    logout: (state) => {
      state.currentUser = null;
      state.isLoggedIn = false;
    },
  },
});

export const { login, logout } = userSlice.actions; 
export default userSlice.reducer; 
