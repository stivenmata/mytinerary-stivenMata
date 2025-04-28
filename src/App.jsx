import React, { useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useDispatch } from "react-redux"; 
import { checkAuthState } from "./redux/features/authSlice"; 

import Home from "./pages/Home";
import Cities from "./pages/Cities";
import CityDetails from "./pages/CityDetails";
import Login from "./components/auth/Login";
import SignUp from "./components/auth/SignUp";
import Logout from "./components/auth/Logout";
import Layout1 from "./layouts/Layouts1";
import PrivateRoute from "./components/auth/PrivateRouter";

const App = () => {
  const dispatch = useDispatch();

  
  useEffect(() => {
    dispatch(checkAuthState()); 
  }, [dispatch]);

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Layout1 />}>
          <Route index element={<Home />} />
          <Route path="cities" element={<Cities />} />
          <Route path="cities/:cityName" element={<CityDetails />} />
          <Route path="login" element={<Login />} />
          <Route path="signup" element={<SignUp />} />
          
          
          <Route
            path="logout"
            element={
              <PrivateRoute>
                <Logout />
              </PrivateRoute>
            }
          />
        </Route>
      </Routes>
    </Router>
  );
};

export default App;
