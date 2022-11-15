import { useState, useEffect } from 'react';
import { useFormik } from 'formik';

import { Form, Button, InputGroup } from 'react-bootstrap';

import { typeFormValidate } from '../../utils/validation';

import ImageCard from '../ImageCard/ImageCard';

function ModeTypeForm({name, type, buttonText, onSubmit}) {
  const [validated, setValidated] = useState(false);
  const [typeIcon, setTypeIcon] = useState('');
  const [iconFile, setIconFile] = useState(null);
  
  const formik = useFormik({
    initialValues: {
      title: type?.title || '',
      color: type?.colorOnMap || '#ffffff',
    },
    validate: typeFormValidate,
    onSubmit: values => {
      onSubmit({
        title: values.title,
        iconFile, 
        color: values.color,        
      });
    },
    onReset: () => {      
    }
  });

  function handleIconSelect(event) {
    setIconFile(event.target.files[0]);
  }

  function handleIconReset() {
    setIconFile(null);
  }

  useEffect(() => {
    if (!iconFile) {
      type ?
      setTypeIcon(type.iconOnMap) 
      : setTypeIcon('');
      return
    }
    const objectUrl = URL.createObjectURL(iconFile);
    setTypeIcon(objectUrl);
    return () => URL.revokeObjectURL(objectUrl);
  }, [iconFile, type]);
  
  return (
    <Form 
      name={`type-form-${name}`}
      onSubmit={(e) => {
        formik.handleSubmit(e);
        setValidated(true);        
      }}
      noValidate 
      className='pt-3 text-center mb-3'
      validated={validated}>
        <h6 className='mb-3'>Иконка типа</h6>
        <ImageCard
        name='type'
          onChange={handleIconSelect}
          imageLink={typeIcon} 
        />               
        
        <Form.Group className='mb-3'>
          <Form.Label className='h6 mb-3'>Название типа</Form.Label>
          <Form.Control 
            type='text'
            name='title' 
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
        <Form.Group className='mb-3'>
          <Form.Label>Выберите цвет</Form.Label>
          <InputGroup >
            <Form.Control
              type='color'
              name='color'
              required
              onChange={formik.handleChange}
              value={formik.values.color}
            />
            <InputGroup.Text>Закрыть</InputGroup.Text>            
          </InputGroup>          
        </Form.Group>
        <Button
          variant='dark'        
          type='submit'
          aria-label={buttonText}
          className='me-2'>
          {buttonText}
        </Button>
        <Button
          variant='dark'
          type='reset'
          aria-label='отменить изменения'
          onClick={() => {
            formik.handleReset();
            handleIconReset();
          }}>
          Отменить изменения
        </Button>
    </Form>
  )
}

export default ModeTypeForm;