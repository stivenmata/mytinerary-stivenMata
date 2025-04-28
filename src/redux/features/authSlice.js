import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isAuthenticated: false,
  user: null,
};


const authSlice = createSlice({
  name: "auth",
  initialState, 
  reducers: {
    login: (state, action) => {
      
      state.isAuthenticated = true;
      state.user = action.payload; 
    },
    logout: (state) => {
      state.isAuthenticated = false;
      state.user = null;
    },
    checkAuthState: (state) => {
      return state; 
    },
  },
});

// Export actions and reducer
export const { login, logout, checkAuthState } = authSlice.actions;
export default authSlice.reducer;