import React from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import App from "./App";
import Home from "./pages/Home";
import CategoryPage from "./pages/CategoryPage";
import MealDetail from "./pages/MealDetail";
import "./index.css";

createRoot(document.getElementById("root") as HTMLElement).render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<App />}>
        <Route index element={<Home />} />
        <Route path="category/:category" element={<CategoryPage />} />
        <Route path="meals/:id" element={<MealDetail />} />
      </Route>
    </Routes>
  </BrowserRouter>
);
