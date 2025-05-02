import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const safeGetItem = (key) => {
  try {
    const item = localStorage.getItem(key);
    if (item === null || item === "undefined") {
      console.error(`Item for ${key} is null or undefined`);
      return null;
    }
    return JSON.parse(item);
  } catch (error) {
    console.error(`Error reading ${key} from localStorage:`, error);
    return null;
  }
};

const userFromStorage = safeGetItem("user");
const tokenFromStorage = safeGetItem("token");

export const validateToken = createAsyncThunk(
  "auth/validateToken",
  async (_, { rejectWithValue }) => {
    try {
      const token = safeGetItem("token");
      if (!token) return rejectWithValue("No token found");

      const response = await axios.get("http://localhost:5000", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      return response.data;
    } catch (error) {
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      return rejectWithValue(error.response?.data || "Token validation failed");
    }
  }
);

export const refreshUserData = createAsyncThunk(
  "auth/refreshUserData",
  async (_, { getState, rejectWithValue }) => {
    try {
      const { token } = getState().auth;
      if (!token) return rejectWithValue("No token found");

      const response = await axios.get("http://localhost:5000/api/users/me", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      localStorage.setItem("user", JSON.stringify(response.data));
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || "Failed to refresh user data");
    }
  }
);

const initialState = {
  isAuthenticated: !!tokenFromStorage,
  user: userFromStorage,
  token: tokenFromStorage,
  isLoading: false,
  error: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login: (state, action) => {
      state.isAuthenticated = true;
      state.user = action.payload.user;
      state.token = action.payload.token;
      state.error = null;
      localStorage.setItem("user", JSON.stringify(action.payload.user));
      localStorage.setItem("token", action.payload.token);
      console.log("User and Token saved to localStorage");
    },
    logout: (state) => {
      state.isAuthenticated = false;
      state.user = null;
      state.token = null;
      localStorage.removeItem("user");
      localStorage.removeItem("token");
    },
    updateUser: (state, action) => {
      state.user = { ...state.user, ...action.payload };
      localStorage.setItem("user", JSON.stringify(state.user));
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(validateToken.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(validateToken.fulfilled, (state) => {
        state.isLoading = false;
        state.isAuthenticated = true;
        state.error = null;
      })
      .addCase(validateToken.rejected, (state, action) => {
        state.isLoading = false;
        state.isAuthenticated = false;
        state.user = null;
        state.token = null;
        state.error = action.payload;
      })
      .addCase(refreshUserData.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(refreshUserData.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = action.payload;
        state.error = null;
      })
      .addCase(refreshUserData.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });
  },
});

export const checkAuthState = () => (dispatch) => {
  const token = safeGetItem("token");
  const user = safeGetItem("user");

  console.log("Token from localStorage:", token);
  console.log("User from localStorage:", user);

  if (token && user) {
    dispatch(login({ token, user }));
  }
};

export const { login, logout, updateUser } = authSlice.actions;
export default authSlice.reducer;
