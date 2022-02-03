import React from 'react';
import { Routes, Route } from 'react-router-dom';

import Home from './pages/Home';
import Add from './pages/Add';
import Edit from './pages/Edit';

function App() {
  return (
    <div className="container mt-5">
      <h1>Dashboard</h1>
      <Routes>
        <Route path="/" exact element={<Home />} />
        <Route path="/add" exact element={<Add />} />
        <Route path="/edit" exact element={<Edit />} />
      </Routes>
    </div>
  );
}

export default App;
