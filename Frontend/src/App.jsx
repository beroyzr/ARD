import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import MediaScans from './pages/MediaScans';
import CaseTracking from './pages/CaseTracking'; // New Route

const App = () => {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/media-scans" element={<MediaScans />} />
        <Route path="/case-tracking" element={<CaseTracking />} /> {/* Added */}
      </Routes>
    </Router>
  );
};

export default App;
