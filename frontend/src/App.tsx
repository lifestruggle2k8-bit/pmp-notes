import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { HomePage } from './pages';
import { ReviewPage } from './pages/review';
import './App.css';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/review" element={<ReviewPage />} />
      </Routes>
    </Router>
  );
}

export default App;
