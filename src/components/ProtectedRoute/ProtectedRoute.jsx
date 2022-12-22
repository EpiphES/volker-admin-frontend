import { Navigate, useLocation } from 'react-router-dom';

function ProtectedRoute({ component: Component, ...props }) {
  const location = useLocation();
  return (
    props.loggedIn ? <Component {...props} /> : <Navigate to='/login' state={{ from: location }} />
  );
}

export default ProtectedRoute;
