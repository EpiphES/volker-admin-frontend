import { Routes, Route
 } from 'react-router-dom';
import Profile from '../Profile/Profile';
import CityForm from '../CityForm.jsx/CityForm';

function ProfilePage({ handleLogout }) {
  

  return (
    <Routes>
      <Route
        index
        element={<Profile onLogout={handleLogout}/>}
      />
      <Route
        path='/city/create'
        element={<CityForm />}
      />
      <Route
        path='/city/update'
        element={<CityForm />}
      />
    </Routes>    
  );
};
export default ProfilePage;