import React from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import Navbar from './components/Navbar';
import Home from './components/Home';
import About from './components/About';
import MusicPlayer from './components/MusicPlayer';

function App() {
  const location = useLocation();

  return (
    <div className="min-h-screen bg-background text-white selection:bg-primary/30">
      <Navbar />

      <AnimatePresence mode="wait">
        <Routes location={location} key={location.pathname}>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
        </Routes>
      </AnimatePresence>

      <MusicPlayer />
    </div>
  );
}

export default App;
