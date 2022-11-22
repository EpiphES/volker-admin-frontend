import { useState, useEffect } from 'react';
import { Routes, Route, Navigate, useNavigate, useLocation } from 'react-router-dom';
import { useDispatch } from 'react-redux';

import * as api from '../../utils/api.js';
import { setUser, deleteUser } from '../../store/userSlice';
import { getCities } from '../../store/citySlice';
import { getModes } from '../../store/modeSlice';

import Login from '../Login/Login';
import NotFoundPage from '../NotFoundPage/NotFoundPage';
import ProtectedRoute from '../ProtectedRoute/ProtectedRoute';
import Layout from '../Layout/Layout';
import Main from '../Main/Main';
import MarkersPage from '../MarkersPage/MarkersPage';
import ModesPage from '../ModesPage/ModesPage';
import Stories from '../Stories/Stories';
import CreateCity from '../CreateCity/CreateCity';
import UpdateCity from '../UpdateCity/UpdateCity';


function App() {
  const [loggedIn, setLoggedIn] = useState(false);
  const navigate = useNavigate(); 
  const dispatch = useDispatch();
  const location = useLocation();
  const [isLoading, setIsLoading] = useState(false);
  const [loginError, setLoginError] = useState(null);
  
  function handleLogin({email, password, fromPage}) {
    setIsLoading(true);
    api
      .login({ email, password })
      .then((res) => {
        localStorage.setItem('token', res.Data);
        return api.getUserInfo(res.Data);        
      })
      .then((res) => {
        dispatch(setUser(res));
        setLoggedIn(true);
        navigate(fromPage);
      })
      .catch((err) => {
        setLoggedIn(false);
        setLoginError(err);
      })
      .finally(() => setIsLoading(false));
  }

  function handleLogout() {
    navigate('/login');
    setLoggedIn(false);
    localStorage.clear();
    dispatch(deleteUser());    
  }
  

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      return;
    }
    const path = location.pathname;
    api.getUserInfo(token)
    .then((res) => {
      dispatch(setUser(res));
      setLoggedIn(true);
      navigate(path);
    })
    .catch((err) => {
      setLoggedIn(false);
      localStorage.clear();
      dispatch(deleteUser());
      console.log(err);
    })     
  }, []);

  useEffect(() => {    
    if(!loggedIn) {
      return
    }
    dispatch(getCities(false));
    dispatch(getModes());
  }, [loggedIn, dispatch]);

  return (
    <div className='d-flex flex-column'
    style={{minHeight: '100vh'}}>
      <Routes>
        <Route
          path='/login'
          element={
          loggedIn ? 
          <Navigate to='/' replace='true' /> :
          <Login 
            onLogin={handleLogin}
            isLoading={isLoading}/>}
        />
        <Route
          path='/'
          element={
            <ProtectedRoute
              component={Layout}
              loggedIn={loggedIn}
              onLogout={handleLogout}>
            </ProtectedRoute>
          }>
          <Route
          index
          element={<Main />}
          />
          <Route
            path='markers/*'
            element={<MarkersPage />}
          />

          <Route
            path='modes/*'
            element={<ModesPage />}
          />

          <Route
            path='stories/*'
            element={<Stories />}
          />

          <Route
            path='/city/create'
            element={ <CreateCity /> }
          />
          <Route
            path='/city/update'
            element={ <UpdateCity /> }
          />
        </Route>
        <Route
          path='*'
          element={<NotFoundPage />}
        />
      </Routes>
    </div>
  );
}

export default App;
