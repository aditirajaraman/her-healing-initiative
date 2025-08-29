/*********************************1: Imports / react *************************************/
import React from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

/*********************************2: Imports / primereact ********************************/

const Logout : React.FC = () => {
  const { logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
      logout(); // This clears the token and state
      navigate('/login'); // Redirect the user to the login page
  };
  return (
    <div>
      <h1>Logout Page</h1>
      <button onClick={handleLogout}>
            Sign Out
      </button>
    </div>
  );
};

export default Logout;