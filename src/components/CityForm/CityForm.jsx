import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useFormik } from 'formik';

import { Form, Row, Col, Button, InputGroup } from 'react-bootstrap';

import { cityFormValidate } from '../../utils/validation';
import { LAT_REGEX, LON_REGEX } from '../../utils/constants';

import { removeModeFromCity } from '../../store/citySlice';

import ModeCard from '../ModeCard/ModeCard';
import ModalWithSelect from '../ModalWithSelect/ModalWithSelect';
import ConfirmationPopup from '../ConfirmationPopup/ConfirmationPopup';
import AddCard from '../AddCard/AddCard';

function CityForm({name, city, buttonText, onSubmit}) {
  const dispatch = useDispatch();
  const { modes } = useSelector(state => state.mode);
  const { 
    updateCityStatus,  
    createCityStatus, 
    removeModeFromCityStatus,
  } = useSelector(state => state.city);
  const [validated, setValidated] = useState(false);
  const [cityModes, setCityModes] = useState([]);  
  const [deletedMode, setDeletedMode] = useState(null);
  const [showModeSelectModal, setShowModeSelectModal] = useState(false);
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  
  
  const formik = useFormik({
    initialValues: {
      cityName: city?.cityName || '',
      latitude: city?.latitude || '',
      longitude: city?.longitude || '',
      description: city?.description || '',
    },
    validate: cityFormValidate,
    onSubmit: values => {
      if(name === 'update') {
        removeModes(); 
      }      
      onSubmit({
        cityName: values.cityName,
        latitude: values.latitude, 
        longitude: values.longitude, 
        description: values.description, 
        modes: cityModes,
      });
    },
    onReset: () => {
      setCityModes(city?.modes || []);
    }
  });

  const cityModeCards = cityModes.map(item => {
    return (
      <Col key={item.id}>        
        <ModeCard item={item} onClick={handleShowConfirmModal} deleteOn/>
      </Col>  
    )
  })

  const selectItems = modes.filter((mode) => {
    return !cityModes.some(item => item.id === mode.id) 
  });

  function handleCloseModeSelectModal() {
    setShowModeSelectModal(false);
  };
  function handleShowModeSelectModal() {
    setShowModeSelectModal(true);
  }  
  function handleCloseConfirmModal() {
    setShowConfirmModal(false);
  }
  function handleShowConfirmModal(id) {
    setShowConfirmModal(true);
    setDeletedMode(modes.find((item) => item.id === id));
  };
  
  function handleAddMode(id) {
    const mode = modes.find(item => item.id === +id);
    setCityModes((prevVal) => [...prevVal, mode]);    
  } 
  
  function handleDeleteMode() {
    setCityModes((prevVal) => prevVal.filter((item) => item.id !== deletedMode.id));
    setDeletedMode(null);
    setShowConfirmModal(false);    
  }

  function removeModes() {
    const modesToDelete = city.modes.filter((mode) => {
        return !cityModes.some((item) => item.id === mode.id);
      })
    modesToDelete.forEach((mode) => {
      dispatch(removeModeFromCity({cityId: city.id, modeId: mode.id}))
    }) 
  }

  useEffect(() => {
    if(city?.modes) {
      setCityModes(city.modes);
    }
  }, [city]);

  return (
    <>      
      <Form 
        name={`city-form-${name}`}
        onSubmit={(e) => {
          formik.handleSubmit(e);
          setValidated(true);        
        }}
        noValidate 
        className='pt-3 text-center mb-3 mx-auto'
        style={{maxWidth: '800px'}}
        validated={validated}>
        
        <fieldset disabled={(updateCityStatus === 'loading' || createCityStatus === 'loading' || removeModeFromCityStatus === 'loading')}>
          <Form.Group className='mb-3' >
            <Form.Label className='h6 mb-3' htmlFor={`cityName-city-${name}`}>Название города</Form.Label>
            <Form.Control 
              type='text'
              name='cityName' 
              placeholder='Введите название'
              id={`cityName-city-${name}`}
              required 
              autoFocus
              onChange={formik.handleChange}
              value={formik.values.cityName}
            />
            <Form.Control.Feedback type='invalid'>
              {formik.errors.cityName}
            </Form.Control.Feedback>
          </Form.Group>

          <h6 className='mb-3'>Координаты</h6>
          <Row className='mb-3'>
            <InputGroup as={Col} hasValidation className='align-items-start'>
              <InputGroup.Text>
                Lat:
              </InputGroup.Text>
              <Form.Control 
                type='text'
                name='latitude' 
                placeholder='Широта'
                required
                pattern={LAT_REGEX}
                onChange={formik.handleChange}
                value={formik.values.latitude}
              />
              <Form.Control.Feedback type='invalid'>
                {formik.errors.latitude}
              </Form.Control.Feedback>
            </InputGroup>

            <InputGroup as={Col} hasValidation className='align-items-start'>
              <InputGroup.Text>
                Lon:
              </InputGroup.Text>
              <Form.Control 
              type='text'
              name='longitude' 
              placeholder='Долгота'
              required
              pattern={LON_REGEX}
              onChange={formik.handleChange}
              value={formik.values.longitude} 
              />
              <Form.Control.Feedback type='invalid'>
                {formik.errors.longitude}
              </Form.Control.Feedback>
            </InputGroup>          
          </Row>

          {name === 'update' &&
            <>
              <h6 className='mb-3'>Pежимы</h6>
              <Row xs={3} sm={4} md={5} className='g-2 h-100 mb-3'>
                {cityModeCards}
                <Col> 
                  < AddCard minHeight={'100px'} onClick={handleShowModeSelectModal} />       
                </Col>     
              </Row>
            </>}

          <Form.Group>
            <Form.Label className='h6 mb-3' htmlFor={`description-city-${name}`}>Описание</Form.Label>
            <Form.Control 
              as='textarea' 
              rows={5}
              name='description'
              id={`description-city-${name}`}
              placeholder='Напишите что-нибудь'
              onChange={formik.handleChange}
              value={formik.values.description}
            />
          </Form.Group>

          <Button
            variant='dark'
            type='submit'
            aria-label={buttonText}
            className='mt-4 me-3'>
            {(updateCityStatus === 'loading' || createCityStatus === 'loading' || removeModeFromCityStatus === 'loading') ? 'Сохранение...' : buttonText}
          </Button>
          <Button
            variant='dark'
            type='reset'
            aria-label='отменить изменения'
            className='mt-4'
            onClick={formik.handleReset}
            >
            Отмена
          </Button>
        </fieldset>
      </Form>

      <ModalWithSelect 
        items={selectItems}
        show={showModeSelectModal}
        onClose={handleCloseModeSelectModal}
        onSubmit={handleAddMode}
      />

      <ConfirmationPopup 
        text={`Удалить режим "${deletedMode?.title}"?`}
        show={showConfirmModal}
        onClose={handleCloseConfirmModal}
        onConfirm={handleDeleteMode}
        onDecline={handleCloseConfirmModal}
      />
    </>
  )
}

export default CityForm