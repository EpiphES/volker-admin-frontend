import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { createCity } from '../../store/citySlice';

import CityForm from '../CityForm/CityForm';
import GoBackButton from '../GoBackButton/GoBackButton';
import Message from '../Message/Message';

function CreateCity() {
  const dispatch = useDispatch();
  const {    
    createCityStatus, 
    createCityError,    
  } = useSelector(state => state.city);
  
  const [showMessage, setShowMessage] = useState(false);

  function handleCreateCity(values) {
    dispatch(createCity(values));
    setShowMessage(true);
  }  

  return (
    <>
      <GoBackButton />      
      
      <CityForm 
        name='create' 
        buttonText='Создать' 
        onSubmit={handleCreateCity}
      />

      <GoBackButton />
      
      {createCityStatus === 'rejected' && <Message type='error' text={createCityError} show={showMessage} setShow={setShowMessage}/>}

      {createCityStatus === 'resolved' && <Message type='success' text='Город создан!' show={showMessage} setShow={setShowMessage}/>}      
    </>
  )
}

export default CreateCity;