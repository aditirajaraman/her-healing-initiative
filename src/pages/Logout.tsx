/*********************************1: Imports / react *************************************/
import React from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { Button } from 'primereact/button';

/*********************************2: Imports / primereact ********************************/
import { Card } from 'primereact/card';

const Logout : React.FC = () => {
  const { logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
      logout(); // This clears the token and state
      navigate('/login'); // Redirect the user to the login page
  };
  return (
    <div  className="flex justify-content-center align-items-center" >
      <Card style={{ width: '25rem', paddingTop: '15px', backgroundColor:'ThreeDFace', display:'grid', placeItems:'center', minHeight:'25vh' }}>
        <p>In order to Sign Out of <i>User Session</i>. Please Sign Out !</p>
        <Button className="p-button-raised p-button-warning" onClick={handleLogout}>
            Sign Out
        </Button>          
      </Card>
    </div>
  );
};

export default Logout;