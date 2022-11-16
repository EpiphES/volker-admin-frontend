import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { updateCity } from '../../store/citySlice';

import CityForm from '../CityForm/CityForm';
import GoBackButton from '../GoBackButton/GoBackButton';
import Message from '../Message/Message';

function UpdateCity() {
  const {currentCity} = useSelector(state => state.city);
  const dispatch = useDispatch();
  const { 
    updateCityStatus, 
    updateCityError, 
    removeModeFromCityStatus,
    removeModeFromCityError,
  } = useSelector(state => state.city);
  
  const [showMessage, setShowMessage] = useState(false);  
  
  function handleUpdateCity(values) {
    dispatch(updateCity({id: currentCity.id, ...values}));
    setShowMessage(true);
  }

  return (
    <>
      <GoBackButton />      
      
      <CityForm 
        name='update' 
        city={currentCity} 
        buttonText='Сохранить'
        onSubmit={handleUpdateCity}
      />

      <GoBackButton />
      
      {(updateCityStatus === 'rejected' || removeModeFromCityStatus === 'rejected') && <Message type='danger' text={`${updateCityError || ''} ${removeModeFromCityError || ''}`} show={showMessage} setShow={setShowMessage}/>}

      {updateCityStatus === 'resolved' && removeModeFromCityStatus !== 'rejected' && <Message type='success' text='Город обновлен!' show={showMessage} setShow={setShowMessage}/>}
    </>
  )
}

export default UpdateCity;