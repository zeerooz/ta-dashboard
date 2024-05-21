import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import HomePage from './components/HomePage';
import AddTA from './components/AddTA';
import EditTA from './components/EditTA';
import ViewTA from './components/ViewTA';
import './App.css'; // Global styles

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" exact element={<HomePage />} />
          <Route path="/add" element={<AddTA />} />
          <Route path="/edit/:id" element={<EditTA />} />
          <Route path="/view/:id" element={<ViewTA />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
