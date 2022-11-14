import './App.css';

import { useState, useEffect } from 'react';
import { Routes, Route, Navigate, useNavigate, useLocation } from 'react-router-dom';
import { useDispatch } from 'react-redux';

import * as api from '../../utils/api.js';
import { getUserInfo, setUser, deleteUser } from '../../store/userSlice';
import { getCities } from '../../store/citySlice';
import { getModes } from '../../store/modeSlice';

import Login from '../Login/Login';
import NotFoundPage from '../NotFoundPage/NotFoundPage';
import ProtectedRoute from '../ProtectedRoute/ProtectedRoute';
import Main from '../Main/Main';
import Markers from '../Markers/Markers';
import ModesPage from '../ModesPage/ModesPage';
import Stories from '../Stories/Stories';
import ProfilePage from '../ProfilePage/ProfilePage';


function App() {
  const [loggedIn, setLoggedIn] = useState(false);
  const navigate = useNavigate(); 
  const dispatch = useDispatch();
  const location = useLocation();
  
  function handleLogin({email, password, fromPage}) {
    api
      .login({ email, password })
      .then((res) => {
        localStorage.setItem('token', res.Data);
        dispatch(getUserInfo(res.Data));
        setLoggedIn(true);
        navigate(fromPage);
      })
      .catch((err) => {
        setLoggedIn(false);
        console.log(err);
      });
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
    <div className='app d-flex flex-column'>
      <Routes>
        <Route
          path='/login'
          element={
          loggedIn ? 
          <Navigate to='/' replace='true' /> :
          <Login onLogin={handleLogin} />}
        />
        <Route
          path='/'
          element={
            <ProtectedRoute
              component={Main}
              loggedIn={loggedIn}>
            </ProtectedRoute>
          }>
          <Route
          index
          element={
            <Navigate 
              to='/markers'
              replace='true'
            />}
          />
          <Route
            path='markers/*'
            element={<Markers />}
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
            path='profile/*'
            element={<ProfilePage handleLogout={handleLogout}/>}
            
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
