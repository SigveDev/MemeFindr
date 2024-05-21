import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

// Pages imports
import LandingPage from "./pages/LandingPage";
import Search from "./pages/Search";
import View from "./pages/View";
import Upload from "./pages/Upload";

const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/search?" element={<Search />} />
        <Route path="/view?" element={<View />} />
        <Route path="/upload" element={<Upload />} />
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
