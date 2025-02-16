import React from 'react';
import { 
  BrowserRouter,
  Routes, 
  Route,
  Link
} from "react-router-dom";
import './App.css';

import Navigationbar from './pages/Navigationbar';

import 'primereact/resources/themes/saga-blue/theme.css';
//import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';
import 'primeflex/primeflex.css';

import Home from './pages/Home';
import About from './pages/About';
import ListEvents from './pages/ListEvents';
import CreateEvent from './pages/CreateEvent';
import Register from './pages/Register';

function App() {
  return (
    <div className="App">
      <Navigationbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/listevents" element={<ListEvents />} />
          <Route path="/createEvent" element={<CreateEvent />} />
          <Route path="/register" element={<Register />} />
        </Routes>
    </div>
  );
}

export default App;
