import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';

import { Card, ListGroup, Form, Button } from 'react-bootstrap';
 
import { fetchCurrentCity } from '../../store/citySlice';

function Profile({onLogout}) {
  const dispatch = useDispatch();
  const {user} = useSelector(state => state.user);
  const {cities, currentCity} = useSelector(state => state.city);
  const citySelect = cities.map(city => {
    return <option key={city.id} value={city.id}>{city.cityName}</option>
  });
  function handleSelectCity(e) {
    dispatch(fetchCurrentCity(e.target.value)); 
  } 
  return (
    <section className='profile pt-3'>
      <Card border='dark' className='text-center'>
        <Card.Header className='fw-bold'>Данные пользователя:</Card.Header>
        <Card.Body>
          <ListGroup variant='flush'>
            <ListGroup.Item>Email: {user.email}</ListGroup.Item>
            <ListGroup.Item>Город: {user.cityId ? cities.find(city => city.id === user.cityId).cityName : 'Все'}</ListGroup.Item>
            <ListGroup.Item>Суперадмин: {user.isSuperAdmin ? 'Да' : 'Нет'}</ListGroup.Item>
          </ListGroup>
        </Card.Body>
      </Card>
      <br/>
      <Card border='dark' className='text-center'>
        <Card.Header className='fw-bold'>Текущий город: {currentCity?.cityName}</Card.Header>
        <Card.Body>
          <Form.Select aria-label='Выберите город' className='mb-3' onChange={handleSelectCity}>
            <option>{currentCity? currentCity.cityName : 'Выберите город'}</option>
            {citySelect}
          </Form.Select>
          <Button variant='secondary' as={Link} to='city/create'>Создать</Button>{' '}
          <Button variant='warning' as={Link} to='city/update'>Редактировать</Button>
        </Card.Body>
      </Card>
      <br />
      <Button variant='dark' size='lg' className='w-100' onClick={onLogout}>Выйти</Button>      
    </section>
  )
}

export default Profile