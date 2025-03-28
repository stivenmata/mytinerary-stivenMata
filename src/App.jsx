import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Cities from "./pages/Cities";
import CityDetails from "./pages/CityDetails";
import Login from "./pages/Login";
import Layout1 from "./layouts/Layouts1";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Layout1 />}>
          <Route index element={<Home />} />
          <Route path="cities" element={<Cities />} />
          <Route path="cities/:cityName" element={<CityDetails />} />
          <Route path="login" element={<Login />} />
        </Route>
      </Routes>
    </Router>
  );
};

export default App;
