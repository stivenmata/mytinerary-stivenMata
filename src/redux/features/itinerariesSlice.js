// redux/features/itinerariesSlice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const backendURL = "http://localhost:5000";

// Acción asincrónica para obtener itinerarios por nombre de ciudad
export const fetchItinerariesByCity = createAsyncThunk(
  "itineraries/fetchByCity",
  async (cityName) => {
    const res = await fetch(`${backendURL}/api/itineraries/city/${cityName}`);
    const data = await res.json();
    if (!data.success) throw new Error("Failed to fetch itineraries");
    return data.data;
  }
);

const itinerariesSlice = createSlice({
  name: "itineraries",
  initialState: {
    items: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchItinerariesByCity.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchItinerariesByCity.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload;
      })
      .addCase(fetchItinerariesByCity.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
        state.items = [];
      });
  },
});

export default itinerariesSlice.reducer;
