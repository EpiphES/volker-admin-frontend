import './App.css';

import { useState, useEffect } from 'react';
import { Routes, Route, Navigate, useNavigate } from 'react-router-dom';

import * as api from '../../utils/api.js';

import Login from '../Login/Login';
import NotFound from '../NotFound/NotFound';
import ProtectedRoute from '../ProtectedRoute/ProtectedRoute';
import Main from '../Main/Main';
import Markers from '../Markers/Markers';
import Modes from '../Modes/Modes';
import Stories from '../Stories/Stories';
import Profile from '../Profile/Profile';

function App() {
  const [loggedIn, setLoggedIn] = useState(true);
  const navigate = useNavigate();

  function handleLogin({email, password}) {
    api
      .login({ email, password })
      .then((res) => {
        if(!res.IsSuccess) {
          throw new Error(res.Error);
        }
        localStorage.setItem('token', res.Data);
        setLoggedIn(true);
        navigate('/');
      })
      .catch((err) => {
        console.log(err);
      });
  }

  function getUserInfo(token) {
    api
      .getUserInfo(token)
      .then((res) => {
        if(!res.IsSuccess) {
          throw new Error(res.Error);
        }
        setLoggedIn(true);
        navigate('/');
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      return;
    }
    getUserInfo(token);    
  }, []);


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
            path='profile'
            element={<Profile />}
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
