import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useFormik } from 'formik';

import { Form, Button, Row, Col } from 'react-bootstrap';

import { modeFormValidate } from '../../utils/validation';

import ImageCard from '../ImageCard/ImageCard';

function ModeForm({name, mode, buttonText, onSubmit}) {
  const [modeIcon, setModeIcon] = useState('');
  const [markerTypes, setMarkerTypes] = useState([]);
  const [validated, setValidated] = useState(false);
  const [iconFile, setIconFile] = useState(null);

  const { 
    updateModeStatus,  
    createModeStatus, 
  } = useSelector(state => state.mode);
  
  const formik = useFormik({
    initialValues: {
      title: mode?.title || '',
    },
    validate: modeFormValidate,
    onSubmit: values => {
      onSubmit({
        title: values.title,
        iconFile, 
        markerTypes,
      });      
    },
  });

  function handleIconSelect(event) {
    setIconFile(event.target.files[0]);
  } 
  
  function handleIconReset() {
    setIconFile(null);
  }

  useEffect(() => {
    if(mode) {
      setMarkerTypes(mode.markerTypes);
    }
  }, [mode]);

  useEffect(() => {
    if (!iconFile) {
      mode ? 
      setModeIcon(mode.icon) 
      : setModeIcon('');
      return
    }
    const objectUrl = URL.createObjectURL(iconFile);
    setModeIcon(objectUrl);
    return () => URL.revokeObjectURL(objectUrl);
  }, [iconFile, mode]);

  return (
    <>
    <Form 
      name={`mode-form-${name}`}
      onSubmit={(e) => {
        formik.handleSubmit(e);
        setValidated(true);        
      }}
      noValidate
      validated={validated}
      className='text-center'
      >
      <fieldset disabled = {(
        updateModeStatus === 'loading' ||
        createModeStatus === 'loading'
      )}>
        <Row>
          <Col xs='auto' md={3} className='d-flex justify-content-center'>
            <ImageCard 
              name='mode'
              onChange={handleIconSelect}
              imageLink={modeIcon}
            />
          </Col>     
        
          <Form.Group as={Col} >
            <Form.Label className='h5 mb-3' htmlFor='title'>Название режима</Form.Label>
            <Form.Control 
              type='text'
              name='title'
              id='title' 
              placeholder='Введите название'
              required 
              autoFocus
              onChange={formik.handleChange}
              value={formik.values.title}
            />
            <Form.Control.Feedback type="invalid">
              {formik.errors.title}
            </Form.Control.Feedback>
          </Form.Group>      
        </Row>

        <Button
          variant='dark'        
          type='submit'
          aria-label={buttonText}
          className='mt-2'>
          {(updateModeStatus === 'loading' || createModeStatus === 'loading') ? 'Сохранение...' : buttonText}
        </Button>

        <Button
          variant='dark'
          type='reset'
          aria-label='очистить изменения'
          onClick={() => {
            formik.handleReset();
            handleIconReset();
          }}
          className='ms-2 mt-2'>
          Очистить изменения
        </Button>

      </fieldset>
    </Form>
    
    </>
  )
}

export default ModeForm