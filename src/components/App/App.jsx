import './App.css';

import { useState, useEffect, useCallback } from 'react';
import { Routes, Route, Navigate, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import * as api from '../../utils/api.js';
import { fetchUserInfo, deleteUser } from '../../store/userSlice';
import { fetchCities, fetchCurrentCity } from '../../store/citySlice';

import Login from '../Login/Login';
import NotFound from '../NotFound/NotFound';
import ProtectedRoute from '../ProtectedRoute/ProtectedRoute';
import Main from '../Main/Main';
import Markers from '../Markers/Markers';
import Modes from '../Modes/Modes';
import Stories from '../Stories/Stories';
import Profile from '../ProfilePage/ProfilePage';


function App() {
  const [loggedIn, setLoggedIn] = useState(false);
  const {user, status: userStatus} = useSelector(state => state.user);
  const navigate = useNavigate(); 
  const dispatch = useDispatch();
  
  function handleLogin({email, password}) {
    api
      .login({ email, password })
      .then((res) => {
        localStorage.setItem('token', res.Data);
        dispatch(fetchUserInfo(res.Data));
      })
      .catch((err) => {
        setLoggedIn(false);
        console.log(err);
      });
  }

  function handleLogout() {
    localStorage.removeItem('token');
    dispatch(deleteUser());
    navigate('/login');
  }
  

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      return;
    }
    dispatch(fetchUserInfo(token));    
  }, [dispatch]);

  useEffect(() => {
    if(userStatus === 'resolved') {
      setLoggedIn(true);
      navigate('/');
      if(user.cityId) {
         dispatch(fetchCurrentCity(user.cityId));
      }
    }
  }, [userStatus, user, dispatch]);

  useEffect(() => {
    if(!loggedIn) {
      return
    }
    dispatch(fetchCities(false));
  }, [loggedIn, dispatch])




  return (
    <div className='app d-flex flex-column'>
      <Routes>
        <Route
          path='/login'
          element={<Login onLogin={handleLogin} />}
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
            element={<Modes />}
          />

          <Route
            path='stories/*'
            element={<Stories />}
          />

          <Route
            path='profile/*'
            element={<Profile handleLogout={handleLogout}/>}
            
          />
        </Route>
        <Route
          path='*'
          element={<NotFound />}
        />
      </Routes>
    </div>
  );
}

export default App;
