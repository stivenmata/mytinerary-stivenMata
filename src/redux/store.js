
import { configureStore } from "@reduxjs/toolkit";
import citiesReducer from "./features/citiesSlice";
import itinerariesReducer from "./features/itinerariesSlice"; 

const store = configureStore({
  reducer: {
    cities: citiesReducer,
    itineraries: itinerariesReducer, 
  },
});

export default store;
