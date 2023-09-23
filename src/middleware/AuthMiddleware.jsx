import React, { useEffect, useMemo } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import LoadingSpinner from '../components/components/LoadingSpinner';
import { useRequestLoading } from '../context/LoadingContext';
import OverlaySpinner from '../components/components/OverlaySpinner';



const AuthMiddleware = ({ component: Component, ...rest }) => {
  const { user, isLoggedIn, logout } = useAuth();
  const navigate = useNavigate();

  const {isRequestLoading} = useRequestLoading();

  // Perform logout when component mounts
  useEffect(() => {
    if ((isLoggedIn || !isLoggedIn) && rest.path === '/logout') {
      logout();
      navigate("/login");
    }
  }, [isLoggedIn, logout, navigate, rest.path]);


  if (isLoggedIn && !rest.privateRoute) {
    return <Navigate to='/' />;
  }

  if (!isLoggedIn && rest.privateRoute) {
    return <Navigate to='/login' />;
  }

  return (
    <>
      {!user && rest.privateRoute ? <LoadingSpinner /> :
      <>
        {isRequestLoading ? <OverlaySpinner /> : ""}
          <Component userData={user}  {...rest} />
      </>
        
      }
    </>
  );
};

export default AuthMiddleware;
