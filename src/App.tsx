import React from 'react';
import { 
  BrowserRouter,
  Routes, 
  Route,
  Link
} from "react-router-dom";
import './App.css';

import Navigationbar from './pages/Navigationbar';

import 'primeicons/primeicons.css';
import 'primereact/resources/themes/lara-light-indigo/theme.css';
//import 'primereact/resources/primereact.min.css';
import 'primereact/resources/primereact.css';
import 'primeflex/primeflex.css';

import Home from './pages/Home';
import About from './pages/About';
import ListEvents from './pages/ListEvents';
import ListBlogs from './pages/ListBlogs';
import CreateEvent from './pages/CreateEvent';
import Donate from './pages/Donate';
import Register from './pages/Register';
import CreateBlog from './pages/CreateBlog';

function App() {
  return (
    <div className="App">
      <Navigationbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/listevents" element={<ListEvents />} />
          <Route path="/listblogs" element={<ListBlogs />} />
          <Route path="/createblog" element={<CreateBlog/>} />
          <Route path="/createEvent" element={<CreateEvent />} />
          <Route path="/donate" element={<Donate />} />
          <Route path="/register" element={<Register />} />
        </Routes>
    </div>
  );
}

export default App;
