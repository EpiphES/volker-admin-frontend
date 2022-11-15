import { Routes, Route } from 'react-router-dom';

import Profile from '../Profile/Profile';
import CreateCity from '../CreateCity/CreateCity';
import UpdateCity from '../UpdateCity/UpdateCity';

function ProfilePage({ handleLogout }) {

  return (
    <Routes>
      <Route
        index
        element={<Profile onLogout={handleLogout}/>}
      />
      <Route
        path='/city/create'
        element={ <CreateCity /> }
      />
      <Route
        path='/city/update'
        element={ <UpdateCity /> }
      />
    </Routes>    
  );
};
export default ProfilePage;