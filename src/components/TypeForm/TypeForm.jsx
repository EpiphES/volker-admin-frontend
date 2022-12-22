import { useEffect, useState } from 'react';
import { Button, Form, InputGroup } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import { useFormik } from 'formik';

import { typeFormValidate } from '../../utils/validation';
import FileInputCard from '../FileInputCard/FileInputCard.jsx';
import FormInput from '../FormInput/FormInput.jsx';

function TypeForm({
  name, type, buttonText, onSubmit, fileLoading,
}) {
  const [validated, setValidated] = useState(false);
  const [typeIcon, setTypeIcon] = useState('');
  const [iconFile, setIconFile] = useState(null);

  const {
    updateTypeStatus,
    createTypeStatus,
  } = useSelector((state) => state.mode);

  const formik = useFormik({
    initialValues: {
      title: type?.title || '',
      color: type?.colorOnMap || '#ffffff',
    },
    validate: typeFormValidate,
    onSubmit: (values) => {
      onSubmit({
        id: type?.id,
        title: values.title,
        iconFile,
        colorOnMap: values.color,
        prevIcon: type?.iconOnMap,
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
      type
      ? setTypeIcon(type.iconOnMap)
      : setTypeIcon('');
      return;
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
      className='text-center'
      validated={validated}>
      <fieldset disabled = {(
        updateTypeStatus === 'loading'
        || createTypeStatus === 'loading'
        || fileLoading
      )}>
        <Form.Group className='mb-3'>
          <Form.Label className='h6'>Выберите цвет</Form.Label>
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

        <h6 className='mb-3'>Иконка типа</h6>
        <div style={{ width: '120px' }} className='mx-auto h-100'>
          <FileInputCard
          name='type'
            onChange={handleIconSelect}
            imageLink={typeIcon}
          />
        </div>

        <FormInput
          title='Название типа'
          type='text'
          name='title'
          placeholder='Введите название'
          required
          autoFocus
          onChange={formik.handleChange}
          value={formik.values.title}
          error={formik.errors.title}
        />

        <Button
          variant='dark'
          type='submit'
          aria-label={buttonText}
          className='me-2'>
          {(updateTypeStatus === 'loading' || createTypeStatus === 'loading' || fileLoading) ? 'Сохранение...' : buttonText}
        </Button>
        <Button
          variant='dark'
          type='reset'
          aria-label='очистить'
          onClick={() => {
            formik.handleReset();
            handleIconReset();
          }}>
          Очистить
        </Button>
      </fieldset>
    </Form>
  );
}

export default TypeForm;
