import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import MediaScans from "./pages/MediaScans";
import CaseTracking from "./pages/CaseTracking";
import Login from "./pages/Login";
import Navbar from "./components/Navbar";
import ProtectedRoute from "./components/ProtectedRoute";

function App() {
  return (
    <Router>
      <Routes>
        {/* Public Route for Login */}
        <Route path="/login" element={<Login />} />

        {/* Protected Routes */}
        <Route element={<ProtectedRoute />}>
          <Route
            path="/*"
            element={
              <>
                <Navbar />
                <Routes>
                  <Route path="/" element={<Home />} />
                  <Route path="/media-scans" element={<MediaScans />} />
                  <Route path="/case-tracking" element={<CaseTracking />} />
                </Routes>
              </>
            }
          />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
