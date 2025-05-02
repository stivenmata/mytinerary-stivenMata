import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const backendURL = "http://localhost:5000";


export const fetchCities = createAsyncThunk("cities/fetchCities", async () => {
  const res = await fetch(`${backendURL}/api/cities`);
  const data = await res.json();
  if (!data.success) throw new Error("Failed to fetch cities");
  return data.data;
});

const citiesSlice = createSlice({
  name: "cities",
  initialState: {
    allCities: [],
    filteredCities: [],
    loading: false,
    error: null,
  },
  reducers: {
    filterCities: (state, action) => {
      const query = action.payload.toLowerCase();
      state.filteredCities = query
        ? state.allCities.filter(city =>
            city.name.toLowerCase().startsWith(query)
          )
        : state.allCities;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCities.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchCities.fulfilled, (state, action) => {
        state.loading = false;
        state.allCities = action.payload;
        state.filteredCities = action.payload;
        state.error = null;
      })
      .addCase(fetchCities.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
        state.allCities = [];
        state.filteredCities = [];
      });
  },
  
});  

export const { filterCities } = citiesSlice.actions;
export default citiesSlice.reducer;
