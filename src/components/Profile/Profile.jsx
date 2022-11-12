import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';

import { Card, ListGroup, Form, Button } from 'react-bootstrap';
 
import { getCurrentCity, deleteCity } from '../../store/citySlice';
import ConfirmationPopup from '../ConfirmationPopup/ConfirmationPopup';

function Profile({onLogout}) {
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const dispatch = useDispatch();
  const {user} = useSelector(state => state.user);
  const {cities, currentCity, currentCityStatus, currentCityError, deleteCityStatus, deleteCityError } = useSelector(state => state.city);

  const citySelect = cities.map(city => {
    return (<option key={city.id} value={city.id}>{city.cityName}</option>)
  });  

  function handleSelectCity(e) {
    dispatch(getCurrentCity(e.target.value)); 
  }

  function handleCloseConfirmModal() {
    setShowConfirmModal(false);
  }
  function handleShowConfirmModal() {
    setShowConfirmModal(true);
  };

  function handleDeleteCity() {
    dispatch(deleteCity(currentCity.id));
    handleCloseConfirmModal();
  }

  return (
    <>
      <section className='profile pt-3'>
        <Card 
          border='dark' className='text-center mb-3'>
          <Card.Header className='fw-bold'>Данные пользователя:</Card.Header>
          <Card.Body>
            <ListGroup variant='flush'>
              <ListGroup.Item>Email: {user.email}</ListGroup.Item>
              <ListGroup.Item>Город: {user.cityId ? cities.find(city => city.id === user.cityId).cityName : 'Все'}</ListGroup.Item>
              <ListGroup.Item>Суперадмин: {user?.isSuperAdmin ? 'Да' : 'Нет'}</ListGroup.Item>
            </ListGroup>
          </Card.Body>
        </Card>
        <Card 
          border='dark' className='text-center mb-5'>
          <Card.Header className='fw-bold'>
            Текущий город:
            {' '} 
            {currentCityStatus === 'loading' && <small className='text-primary'>Идет загрузка...</small>}
            {currentCityStatus === 'resolved' && currentCity?.cityName}
            {currentCityStatus === 'rejected' && <small className='text-danger'>{currentCityError}</small>}
          </Card.Header>
          <Card.Body>
            <Form.Select aria-label='выберите город' className='mb-3' onChange={handleSelectCity}>
              <option value={currentCity?.id}>{currentCity? currentCity.cityName : 'Выберите город'}</option>
              {citySelect}
            </Form.Select>
            <Link to='city/create' className='me-2'>
              <Button 
                variant='secondary' 
                aria-label='создать город'>
                Создать
              </Button>
            </Link>
            <Link to={currentCity ? 'city/update' : null} className='me-2'>
              <Button
                variant='success'
                disabled={!currentCity}
                aria-label='редактировать город'>
                Редактировать
              </Button>
            </Link>
            <Button
              type='button'
              variant='danger' 
              disabled={!currentCity || deleteCityStatus === 'loading'}
              aria-label='удалить город'
              onClick={handleShowConfirmModal}>
              {deleteCityStatus === 'loading' ? 'Удаление...' : 'Удалить'}
            </Button>
          </Card.Body>
        </Card>
        <Button variant='dark' size='lg' className='w-100' onClick={onLogout}>Выйти</Button>      
      </section>
      <ConfirmationPopup 
        text={`Удалить ${currentCity?.cityName}?`}
        show={showConfirmModal}
        onClose={handleCloseConfirmModal}
        onConfirm={handleDeleteCity}
        onDecline={handleCloseConfirmModal}
      />
    </>
  )
}

export default Profile