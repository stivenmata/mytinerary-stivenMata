import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const backendURL = "http://localhost:5000";


export const fetchItinerariesByCity = createAsyncThunk(
  "itineraries/fetchByCity",
  async (cityName) => {
    const res = await fetch(`${backendURL}/api/itineraries/city/${cityName}`);
    const data = await res.json();
    if (!data.success) throw new Error("Failed to fetch itineraries");
    return data.data;
  }
);


export const likeItinerary = createAsyncThunk(
  "itineraries/like",
  async (itineraryId) => {
    const res = await fetch(`${backendURL}/api/itineraries/like/${itineraryId}`, {
      method: "PUT",
    });
    if (!res.ok) {
      
      throw new Error('Failed to like itinerary');
    }
    const data = await res.json();
    if (!data._id) throw new Error("Failed to like itinerary");
    return data; 
  }
);


const itinerariesSlice = createSlice({
  name: "itineraries",
  initialState: {
    items: [],
    loading: false,
    error: null,
  },
  reducers: {
    resetItineraries: (state) => {
      state.items = [];
      state.loading = false;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Obtener itinerarios
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
      })

      // Like itinerario
      .addCase(likeItinerary.fulfilled, (state, action) => {
        const updated = action.payload;
        const index = state.items.findIndex((i) => i._id === updated._id);
        if (index !== -1) {
          state.items[index] = updated; 
        }
      })
      
      .addCase(likeItinerary.rejected, (state, action) => {
        state.error = action.error.message;
      });
  },
});

export const { resetItineraries } = itinerariesSlice.actions;
export default itinerariesSlice.reducer;
