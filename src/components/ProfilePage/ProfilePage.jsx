import { Routes, Route } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';

import { createCity, updateCity } from '../../store/citySlice';

import Profile from '../Profile/Profile';
import CityForm from '../CityForm/CityForm';

function ProfilePage({ handleLogout }) {
  const dispatch = useDispatch();
  const {currentCity} = useSelector(state => state.city);

  function handleCreateCity(values) {
    dispatch(createCity(values));
  }

  function handleUpdateCity(values) {
    dispatch(updateCity({id: currentCity.id, ...values}))
  }

  function handleReset() {
    dispatch(updateCity(currentCity));
  }

  return (
    <Routes>
      <Route
        index
        element={<Profile onLogout={handleLogout}/>}
      />
      <Route
        path='/city/create'
        element={
          <CityForm 
            name='create' 
            buttonText='Создать' 
            onSubmit={handleCreateCity}
          />
        }
      />
      <Route
        path='/city/update'
        element={
          <CityForm 
            name='update' 
            city={currentCity} 
            buttonText='Сохранить'
            onSubmit={handleUpdateCity}
            onReset={handleReset}
          />
        }
      />
    </Routes>    
  );
};
export default ProfilePage;