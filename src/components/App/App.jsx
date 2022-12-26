import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import
{
  Navigate,
  Route,
  Routes,
  useLocation,
  useNavigate,
} from 'react-router-dom';

import { getCities, setCurrentCity } from '../../store/citySlice';
import { getModes } from '../../store/modeSlice';
import { setUser } from '../../store/userSlice';
import * as api from '../../utils/api';
import CreateCity from '../CreateCity/CreateCity.jsx';
import Layout from '../Layout/Layout.jsx';
import Loader from '../Loader/Loader.jsx';
import Login from '../Login/Login.jsx';
import Message from '../Message/Message.jsx';
import Main from '../pages/MainPage/MainPage.jsx';
import MarkersPage from '../pages/MarkersPage/MarkersPage.jsx';
import ModesPage from '../pages/ModesPage/ModesPage.jsx';
import NotFoundPage from '../pages/NotFoundPage/NotFoundPage.jsx';
import StoriesPage from '../pages/StoriesPage/StoriesPage.jsx';
import ProtectedRoute from '../ProtectedRoute/ProtectedRoute.jsx';
import UpdateCity from '../UpdateCity/UpdateCity.jsx';

function App() {
  const [loggedIn, setLoggedIn] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation();
  const [isLoginLoading, setIsLoginLoading] = useState(false);
  const [isTokenCheckLoading, setIsTokenCheckLoading] = useState(false);
  const [loginError, setLoginError] = useState(null);
  const [showLoginError, setShowLoginError] = useState(false);

  function handleLogin({ email, password, fromPage }) {
    setIsLoginLoading(true);
    api
      .login({ email, password })
      .then((res) => {
        localStorage.setItem('token', res.data);
        return api.getUserInfo(res.data);
      })
      .then((res) => {
        dispatch(setUser(res));
        setLoggedIn(true);
        navigate(fromPage);
      })
      .catch((err) => {
        setLoggedIn(false);
        setLoginError(err);
        setShowLoginError(true);
      })
      .finally(() => setIsLoginLoading(false));
  }

  function handleLogout() {
    navigate('/login');
    setLoggedIn(false);
    localStorage.clear();
    dispatch(setUser(null));
    dispatch(setCurrentCity(null));
  }

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      return;
    }
    const path = location.pathname;
    setIsTokenCheckLoading(true);
    api.getUserInfo(token)
      .then((res) => {
        dispatch(setUser(res));
        setLoggedIn(true);
        navigate(path);
      })
      .catch((err) => {
        setLoggedIn(false);
        localStorage.clear();
        dispatch(setUser(null));
        console.log(err);
      })
      .finally(() => setIsTokenCheckLoading(false));
  }, [dispatch]);

  useEffect(() => {
    if (!loggedIn) {
      return;
    }
    dispatch(getCities(false));
    dispatch(getModes());
  }, [loggedIn, dispatch]);

  return (
    <div className='d-flex flex-column'
    style={{ minHeight: '100vh' }}>
      <Routes>
        <Route
          path='/login'
          element={
            loggedIn
              ? <Navigate to='/' replace='true' />
              : isTokenCheckLoading
                ? <Loader />
                : <Login
              onLogin={handleLogin}
              isLoading={isLoginLoading} />
          }
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
            element={<StoriesPage />}
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

      {loginError && <Message type='danger'
      title='Ошибка при попытке авторизации' text={`${loginError}`} show={showLoginError} setShow={setShowLoginError} />}
    </div>
  );
}

export default App;
