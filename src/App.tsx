import React from 'react';
import { 
  BrowserRouter,
  Routes, 
  Route,
  Link
} from "react-router-dom";
import './App.css';

import Home from './pages/Home';
import About from './pages/About';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
      </Routes>
      </BrowserRouter>
      <header className="App-header">
        <img src="https://images.freeimages.com/images/large-previews/ab3/puppy-2-1404644.jpg" className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.tsx</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
