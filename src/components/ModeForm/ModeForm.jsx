import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useFormik } from 'formik';

import { Form, Button} from 'react-bootstrap';

import { modeFormValidate } from '../../utils/validation';

import FileInputCard from '../FileInputCard/FileInputCard';
import FormInput from '../FormInput/FormInput';

function ModeForm({name, mode, buttonText, onSubmit, fileLoading}) {
  const [modeIcon, setModeIcon] = useState('');
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
      <fieldset disabled={(
        updateModeStatus === 'loading' ||
        createModeStatus === 'loading' ||
        fileLoading
        )}>

        <FormInput
          title='Название режима'
          type='text'
          name='title'
          id={`title-mode-${name}`} 
          placeholder='Введите название'
          required 
          autoFocus
          onChange={formik.handleChange}
          value={formik.values.title}
          error={formik.errors.title}
        />
        
        <h6 className='mb-2'>Иконка режима</h6>
        <div style={{width: '120px'}} className='mx-auto'>
          <FileInputCard 
            name='mode'
            onChange={handleIconSelect}
            imageLink={modeIcon}
          />
        </div>
          
        <Button
          variant='dark'        
          type='submit'
          aria-label={buttonText}
          className='mt-3'>
          {(updateModeStatus === 'loading' || createModeStatus === 'loading' || fileLoading) ? 'Сохранение...' : buttonText}
        </Button>

        <Button
          variant='dark'
          type='reset'
          aria-label='очистить изменения'
          onClick={() => {
            formik.handleReset();
            handleIconReset();
          }}
          className='ms-2 mt-3'>
          Очистить изменения
        </Button>
      </fieldset>
    </Form>
  )
}

export default ModeForm