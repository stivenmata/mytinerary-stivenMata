
import { configureStore } from "@reduxjs/toolkit";
import citiesReducer from "./features/citiesSlice";
import itinerariesReducer from "./features/itinerariesSlice";
import authReducer from "./features/authSlice"; 

const store = configureStore({
  reducer: {
    cities: citiesReducer,
    itineraries: itinerariesReducer,
    auth: authReducer, 
  },
});

export default store;
