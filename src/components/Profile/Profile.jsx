import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';

import { Card, ListGroup, Form, Button } from 'react-bootstrap';

import { getCurrentCity, deleteCity } from '../../store/citySlice';

import ConfirmationPopup from '../ConfirmationPopup/ConfirmationPopup';
import Message from '../Message/Message';

function Profile({onLogout}) {
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const dispatch = useDispatch();
  const {user} = useSelector(state => state.user);
  const [showDeleteCityMessage, setShowDeleteCityMessage] = useState(false);
  const {
    cities,
    currentCity,
    currentCityStatus,
    currentCityError,
    deleteCityStatus,
    deleteCityError
  } = useSelector(state => state.city);

  const citySelect = cities.map(city => {
    return (<option key={city.id} value={city.id}>{city.cityName}</option>)
  });

  function handleSelectCity(e) {
    if(e.target.value) {
      dispatch(getCurrentCity(e.target.value));
    }
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
      <section className='pt-3'>
        <Card
          border='dark' className='text-center mb-3'>
          <Card.Header className='fw-bold'>Данные пользователя:</Card.Header>
          <Card.Body>
            <ListGroup variant='flush'>
              <ListGroup.Item>Email: {user?.email}</ListGroup.Item>
              <ListGroup.Item>Город: {user?.cityId ? cities.find(city => city.id === user.cityId).cityName : 'Все'}</ListGroup.Item>
              <ListGroup.Item>Суперадмин: {user?.isSuperAdmin ? 'Да' : 'Нет'}</ListGroup.Item>
            </ListGroup>
          </Card.Body>
        </Card>
        <Card
          border='dark' className='text-center mb-5'>
          <Card.Header className='fw-bold'>
            Текущий город:
            {' '}
            {!currentCity && !currentCityStatus && 'Не выбран'}
            {currentCityStatus === 'loading' && <small className='text-primary'>Идет загрузка...</small>}
            {currentCityStatus === 'resolved' && currentCity?.cityName}
            {currentCityStatus === 'rejected' && <small className='text-danger'>{currentCityError}</small>}
          </Card.Header>
          <Card.Body>
            <Form.Select
              aria-label='выберите город' onChange={handleSelectCity}
              value={currentCity?.id || ''}
            >
              <option disabled value=''>Выберите город</option>
              {citySelect}
            </Form.Select>
            <Link to='city/create' className='me-2 mt-3'>
              <Button
                variant='secondary'
                aria-label='создать город'
                className='mt-3'>
                Создать
              </Button>
            </Link>
            <Link to={currentCity ? 'city/update' : null} className='me-2 mt-3'>
              <Button
                variant='success'
                disabled={!currentCity}
                aria-label='редактировать город'
                className='mt-3'>
                Редактировать
              </Button>
            </Link>
            <Button
              type='button'
              variant='danger'
              disabled={!currentCity || deleteCityStatus === 'loading'}
              aria-label='удалить город'
              onClick={handleShowConfirmModal}
              className='mt-3'>
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

      {deleteCityStatus === 'rejected' && <Message type='danger' text={`${deleteCityError}`} show={showDeleteCityMessage} setShow={setShowDeleteCityMessage} />}

      {deleteCityStatus === 'resolved' && <Message type='success' text='Режим удален!' show={showDeleteCityMessage} setShow={setShowDeleteCityMessage} />}

    </>
  )
}

export default Profile;