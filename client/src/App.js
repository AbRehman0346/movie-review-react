import React from "react";
import Home from "./pages/Home";
import Login from "./pages/login";
import Display from "./pages/DisplayPage";
import "./css/global.css";
import RegisterPage from "./pages/RegisterPage";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import AddReview from "./pages/AddReview";
import Manage from "./pages/manage";
import { RoutePaths } from "./xnavigate";
import UpdateReview from "./pages/update_review";
import { PrivateRoutes, ProtectedRoutes } from "./PrivateRoutes";

function App() {
  return (
    <Router>
      <Routes>
        {/* Login Page */}
        <Route path={RoutePaths.LOGIN} element={<Login />} />

        {/* RegisterPage */}
        <Route path={RoutePaths.REGISTER} element={<RegisterPage />} />

        {/* Protected Routes */}
        <Route element={<ProtectedRoutes />}>
          {/* Home Page */}
          <Route path={RoutePaths.ROOT} element={<Home />} />

          {/* Display Movie Review Record */}
          <Route path={RoutePaths.DISPLAY} element={<Display />} />
        </Route>

        {/* Private Routes */}
        <Route element={<PrivateRoutes />}>
          {/* Add Review Record */}
          <Route path={RoutePaths.ADD_REVIEW} element={<AddReview />} />

          {/* Manage Page */}
          <Route path={RoutePaths.MANAGE} element={<Manage />} />

          {/* Update Page/ Edit Post Page */}
          <Route path={RoutePaths.UPDATE} element={<UpdateReview />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
