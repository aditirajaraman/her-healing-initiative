import React from 'react';
import { 
  Routes, 
  Route
} from "react-router-dom";
import './App.css';

import Navigationbar from './pages/Navigationbar';


import 'primereact/resources/themes/lara-light-indigo/theme.css';
import 'primereact/resources/primereact.css';

import 'primeicons/primeicons.css';

import 'primeflex/primeflex.css';

import Home from './pages/Home';
import About from './pages/About';
import ListEvents from './pages/ListEvents';
import ListBlogs from './pages/ListBlogs';
import CreateEvent from './pages/CreateEvent';
import Donate from './pages/Donate';
import Register from './pages/Register';
import CreateBlog from './pages/CreateBlog';
import ViewBlog from './pages/ViewBlog';
import EditBlog from './pages/EditBlog';
import Login from './pages/Login';
import Logout from './pages/Logout';
import Profile from './pages/Profile';
import ForgotUserNamePassword from './pages/ForgotUserNamePassword';
import ErrorDisplay from './pages/ErrorDisplay';
import Team from './pages/Team';

// Import the ProtectedRoute component
import ProtectedRoute from './pages/ProtectedRoute'; 
import { AuthProvider } from './context/AuthContext';

function App() {
  return (
    <div className="App">
      <AuthProvider>
      <Navigationbar />
        <Routes>
         {/* Public routes - anyone can access these */}
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/team" element={<Team />} />
        <Route path="/listevents" element={<ListEvents />} />
        <Route path="/listblogs" element={<ListBlogs />} />
        <Route path="/viewBlog" element={<ViewBlog />} />
        <Route path="/donate" element={<Donate />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login/>} />
        <Route path="/logout" element={<Logout/>} />
        <Route path="/errorDisplay" element={<ErrorDisplay />} />
        <Route path="/forgotusernameorpassword" element={<ForgotUserNamePassword />} />
        <Route path="/profile" element={<Profile/>} />

        {/* Protected routes - only logged-in users can access */}
        <Route
          path="/profile"
          element={
            <ProtectedRoute>
              <Profile />
            </ProtectedRoute>
          }
        />
        <Route
          path="/createblog"
          element={
            <ProtectedRoute>
              <CreateBlog/>
            </ProtectedRoute>
          }
        />
        <Route
          path="/createEvent"
          element={
            <ProtectedRoute>
              <CreateEvent />
            </ProtectedRoute>
          }
        />
        <Route
          path="/editBlog"
          element={
            <ProtectedRoute>
              <EditBlog />
            </ProtectedRoute>
          }
        />
      </Routes>
       </AuthProvider>
    </div>
  );
}

export default App;
