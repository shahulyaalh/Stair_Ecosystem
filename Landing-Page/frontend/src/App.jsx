import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/Header/Header";
import Home from "./pages/Home";
import About from "./pages/About"; // Import About page
import "./index.css";
import Contact from "./Pages/Contact";
import Products from "./Pages/Products";

const App = () => {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} /> {/* Route for About page */}
        <Route path="/Contact" element={<Contact />} />
        <Route path="/Products" element={<Products />} />
      </Routes>
    </Router>
  );
};

export default App;
