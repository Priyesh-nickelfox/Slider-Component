import React, { useEffect } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useNavigate } from 'react-router-dom';
import auth from '../Firebase/FirebaseConfig'; 

const ProtectedRoute = ({ element: Element}) => {
  const [user, loading] = useAuthState(auth);
  const navigate = useNavigate();

  useEffect(() => {
    if (!loading && !user) {
      navigate('/login'); 
    }
  }, [user, loading, navigate]);


  return user ? Element : null;
};

export default ProtectedRoute;
