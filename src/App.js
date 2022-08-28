import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Layout from "./components/Layout/Layout";
import Login from "./pages/Login/Login";
import Checkout from "./pages/Checkout/Checkout";

const App = () => {

  return (
    <Router>
      <Routes>
        <Route path={`/login`} element={<Login />} />
        <Route path={`/checkout/*`} element={<Checkout />} />
        <Route path={`*`} element={<Layout />} />
      </Routes>
    </Router>
  )
}

export default App