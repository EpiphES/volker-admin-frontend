import './CityForm.css';

import { useState, useEffect } from 'react';

import { useSelector } from 'react-redux';
import { useFormik } from 'formik';

import { Form, Row, Col, Button, Card, Modal, Badge, InputGroup } from 'react-bootstrap';
import { BsPlusCircleDotted } from 'react-icons/bs';

import { cityFormValidate } from '../../utils/validation';
import { LAT_REGEX, LON_REGEX } from '../../utils/constants';

import ConfirmationPopup from '../ConfirmationPopup/ConfirmationPopup';
import GoBackButton from '../GoBackButton/GoBackButton';

function CityForm({name, city, buttonText, onSubmit}) {
  
  const { modes } = useSelector(state => state.mode);
  const [validated, setValidated] = useState(false);
  const [cityModes, setCityModes] = useState([]);  
  const [selectedMode, setSelectedMode] = useState(null);
  const [deletedMode, setDeletedMode] = useState(null);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  
  const formik = useFormik({
    initialValues: {
      cityName: city?.cityName || '',
      latitude: city?.latitude || 0,
      longitude: city?.longitude || 0,
      description: city?.description || '',
    },
    validate: cityFormValidate,
    onSubmit: values => {
      onSubmit({
        cityName: values.cityName,
        latitude: values.latitude, 
        longitude: values.longitude, 
        description: values.description, 
        modes: cityModes,
      });
    },
  });

  const cityModeCards = cityModes.map(item => {
    return (
      <Col key={item.id}>        
        <Card 
          as='button'
          type='button' 
          className='shadow-sm w-100 h-100 justify-content-between align-items-center gap-2 p-2 city-form__card' 
          border='success'
          onClick={() => handleShowConfirmModal(item)}>          
          <Badge 
            pill 
            bg='danger'
            text='light' 
            bsPrefix='city-form__card-badge p-2'>
            Удалить
          </Badge>
          <Card.Img src={item.icon} className='w-75'/>          
          <Card.Title as='h6'>
            {item.title}
          </Card.Title>          
        </Card>
      </Col>  
    )
  })

  const modeSelect = modes.map((mode) => {
    if(cityModes.some(item => item.id === mode.id)) {
      return null;
    }
    return (
      <option key={mode.id} value={mode.id}>
        {mode.title}
      </option>
    );        
  });

  function handleCloseAddModal() {
    setShowAddModal(false);
    setSelectedMode(null);
  };
  function handleShowAddModal() {
    setShowAddModal(true);
  }  
  function handleCloseConfirmModal() {
    setShowConfirmModal(false);
  }
  function handleShowConfirmModal(item) {
    setShowConfirmModal(true);
    setDeletedMode(item);
  };
    
  function handleSelectMode(e) {
    const mode = modes.find(item => item.id === +e.target.value);    
    setSelectedMode(mode);
  }
  
  function handleAddMode() {
    setCityModes((prevVal) => [...prevVal, selectedMode]);
    setSelectedMode(null);
  } 
  
  function handleDeleteMode() {
    setCityModes((prevVal) => prevVal.filter((item) => item.id !== deletedMode.id));
    setDeletedMode(null);
    setShowConfirmModal(false);
  }

  useEffect(() => {
    if(city?.modes) {
      setCityModes(city.modes)
    }
  }, [city]);

  return (
    <>
      <GoBackButton />      
      <Form 
        name={`city-form-${name}`}
        onSubmit={(e) => {
          formik.handleSubmit(e);
          setValidated(true);        
        }}
        noValidate 
        className='pt-3 text-center mb-3'
        validated={validated}>
        <Form.Group className="mb-3" >
          <Form.Label className='h6'>Название города</Form.Label>
          <Form.Control 
            type='text'
            name='cityName' 
            placeholder='Введите название'
            required 
            autoFocus
            onChange={formik.handleChange}
            value={formik.values.cityName}
          />
          <Form.Control.Feedback type="invalid">
            {formik.errors.cityName}
          </Form.Control.Feedback>
        </Form.Group>
        <h6>Координаты</h6>
        <Row className="mb-3">
          <InputGroup as={Col} hasValidation className='align-items-start'>
            <InputGroup.Text>
              Lat:
            </InputGroup.Text>
            <Form.Control 
              type='text'
              name='latitude' 
              placeholder='Широта'
              pattern={LAT_REGEX}
              onChange={formik.handleChange}
              value={formik.values.latitude}
            />
            <Form.Control.Feedback type="invalid">
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
            pattern={LON_REGEX}
            onChange={formik.handleChange}
            value={formik.values.longitude} 
            />
            <Form.Control.Feedback type="invalid">
              {formik.errors.longitude}
            </Form.Control.Feedback>
          </InputGroup>            
          
        </Row>

        <h6>Pежимы</h6>
        <Row xs={2} sm={3} md={5} lg={6}className='g-2 h-100 mb-3'>
          {cityModeCards}
          <Col>          
            <Card
              as='button'
              type='button'
              className='city-form__card h-100 w-100 shadow-sm' 
              onClick={handleShowAddModal}
              border='success'>
              <div className='city-form__card-contain d-flex align-items-center justify-content-center'>
                <BsPlusCircleDotted className='w-50 h-50' />
              </div>              
            </Card>            
          </Col>     
        </Row>

        <Form.Group>
          <Form.Label className='h6'>Описание</Form.Label>
          <Form.Control 
            as='textarea' 
            rows={3}
            name='description'
            placeholder='Напишите что-нибудь'
            onChange={formik.handleChange}
            value={formik.values.description}
          />
        </Form.Group>
        <Button
          variant='primary'
          size='lg'
          type='submit'
          aria-label={buttonText}
          className='mt-4'>
          {buttonText}
        </Button>
      </Form>

      <Modal show={showAddModal} onHide={handleCloseAddModal}>
        <Modal.Header closeButton>
          <Modal.Title>Выбор режима</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form.Select aria-label='выберите     режим' onChange={handleSelectMode}>
            <option>-</option>
            {modeSelect}
          </Form.Select>
        </Modal.Body>
        <Modal.Footer>
          <Button 
            variant="secondary" 
            onClick={handleAddMode}
            disabled={!selectedMode}>
            Добавить
          </Button>
        </Modal.Footer>
      </Modal>

      <ConfirmationPopup 
        text={`Удалить режим ${deletedMode?.title}?`}
        show={showConfirmModal}
        onClose={handleCloseConfirmModal}
        onConfirm={handleDeleteMode}
      />
    </>
  )
}

export default CityForm