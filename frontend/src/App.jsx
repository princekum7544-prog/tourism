import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Landing from './pages/Landing';
import EmotionSelect from './pages/EmotionSelect';
import Results from './pages/Results';

import BackgroundCarousel from './components/BackgroundCarousel';

function App() {
  return (
    <Router>
      <BackgroundCarousel />
      <div className="app-container">
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/plan" element={<EmotionSelect />} />
          <Route path="/results" element={<Results />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
