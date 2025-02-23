import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Cities from "./pages/Cities";
import Layout1 from "../src/layouts/Layouts1"; 

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Layout1 />}>
          <Route index element={<Home />} />
          <Route path="cities" element={<Cities />} />
        </Route>
      </Routes>
    </Router>
  );
};

export default App;
