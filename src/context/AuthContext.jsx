import React, { createContext, useContext, useState, useEffect, useMemo } from 'react';
import ApiService from '../helper/http/apiService';
import { toast } from 'react-toastify';
import { responseCatcher } from '../helper/http/response';
 
const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [token, setToken] = useState(null);
  const [loading, setLoading] = useState(true);

  const api = new ApiService();

  const fetchUserData = async () => {
    try {
      const response = await api.getWithToken('/user');
      setUser(response.user);
      console.log(response)
    } catch (error) {
      responseCatcher(error)
      console.error('Error fetching authenticated data:', error);

      // when auth fails
      setUser(null);
      setIsLoggedIn(false);
      setToken(null);
      localStorage.removeItem('token');

    } finally {
      setLoading(false);
    }
  };

  const asyncLocalStorage = {
    getItem: async (key) => {
      return await Promise.resolve(localStorage.getItem(key));
    },
    
  };

  useEffect(() => {
    async function checkLocalStorage() {
      const tokenFromLocalStorage = await asyncLocalStorage.getItem('token');
      if (tokenFromLocalStorage) {
        fetchUserData();
        setIsLoggedIn(true);
        setLoading(false);
      } else {
        setLoading(false);
      }
    }
    checkLocalStorage();
  }, []);

  const authenticateUser = async (response) => {
    const { token: newToken} = response;
    localStorage.setItem('token', JSON.stringify(newToken));
    setToken(newToken);
    setIsLoggedIn(true);
    fetchUserData();
    toast.success(response.message);
  };

  const register = async (userFormData) => {
    try {
      const response = await api.postWithOutToken('/auth/register', userFormData);
      console.log(response);
      authenticateUser(response);
    } catch (error) {
      console.log(error);
      responseCatcher(error);
    }
  };

  const login = async (userData) => {
    try {
      const response = await api.postWithOutToken('/auth/login', userData);
      authenticateUser(response);
    } catch (error) {
      responseCatcher(error);
    }
  };

  const logout = () => {
      toast.success("Logged out Successfully");
      setUser(null);
      setIsLoggedIn(false);
      setToken(null);
      localStorage.removeItem('token');
  };

  const authContextValue = useMemo(() => {
    return {
      user,
      isLoggedIn,
      login,
      logout,
      token,
      register,
      fetchUserData,
      loading,
    };
  }, [user, isLoggedIn, token, loading]);

  return (
    <AuthContext.Provider value={authContextValue}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}