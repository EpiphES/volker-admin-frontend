import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Alert } from 'react-bootstrap';

import { updateCity } from '../../store/citySlice';

import CityForm from '../CityForm/CityForm';
import GoBackButton from '../GoBackButton/GoBackButton';
import Message from '../Message/Message';
import Loader from '../Loader/Loader';

function UpdateCity() {
  const {currentCity} = useSelector(state => state.city);
  const dispatch = useDispatch();
  const {
    updateCityStatus,
    updateCityError,
    removeModeFromCityStatus,
    removeModeFromCityError,
    currentCityStatus,
    currentCityError
  } = useSelector(state => state.city);

  const [showMessage, setShowMessage] = useState(false);

  function handleUpdateCity(values) {
    dispatch(updateCity({id: currentCity.id, ...values}));
    setShowMessage(true);
  }

  return (
    <>
      <GoBackButton />
      { currentCityStatus === 'loading' && <Loader />}
      { currentCityStatus === 'resolved' &&
        <>
          <CityForm
            name='update'
            city={currentCity}
            buttonText='Сохранить'
            onSubmit={handleUpdateCity}
          />

          <GoBackButton />
        </>}

      { currentCityStatus === 'rejected' &&
      <Alert variant='danger'>
        {currentCityError}
      </Alert> }

      {(updateCityStatus === 'rejected' || removeModeFromCityStatus === 'rejected') && <Message type='danger' text={`${updateCityError || ''} ${removeModeFromCityError || ''}`} show={showMessage} setShow={setShowMessage}/>}

      {updateCityStatus === 'resolved' && removeModeFromCityStatus !== 'rejected' && <Message type='success' text='Город обновлен!' show={showMessage} setShow={setShowMessage}/>}
    </>
  )
}

export default UpdateCity;