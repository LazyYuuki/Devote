import React from 'react';
import {
  HashRouter,
  Route,
  Routes
} from "react-router-dom";

import Home from "pages/Home/Index";
import Vote from "pages/Vote/Index"

// =============================================================================
export default function App() {
  return (
    <div>
      <HashRouter basename="/">
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route path="/vote" element={<Vote />} />
        </Routes>
      </HashRouter>
    </div>
  );
}
