import React from 'react';
import {BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from "./pages/Home"
import Navbar from "./com/Navbar";
import Bears from "./pages/Bears";
import Players from "./pages/Players";
import Cheer from "./pages/Cheer";
import FanCheer from './pages/FanCheer';

const App = () => {
  return (
    <Router basename='/doosanbears'>
      <div>
        <Navbar/>
        <Routes>
          <Route path="/" element={<Home />}/>
          <Route path="/bears" element={<Bears />} />
          <Route path="/players" element={<Players />} />
          <Route path="/cheer" element={<Cheer />} />
          <Route path="/fan/cheer" element={<FanCheer />} />
        </Routes>
      </div>
    </Router>
  )
}

export default App