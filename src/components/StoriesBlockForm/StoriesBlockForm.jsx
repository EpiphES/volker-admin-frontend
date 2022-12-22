import { useState } from 'react';
import { Button, Form } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import { useFormik } from 'formik';

import { storiesBlockFormValidate } from '../../utils/validation';
import FormInput from '../FormInput/FormInput.jsx';

function StoriesBlockForm({
  name, block, buttonText, onSubmit,
}) {
  const [validated, setValidated] = useState(false);

  const {
    updateStoriesBlockStatus,
    createStoriesBlockStatus,
  } = useSelector((state) => state.story);

  const {
    cities,
    currentCity,
  } = useSelector((state) => state.city);

  const formik = useFormik({
    initialValues: {
      title: block?.title || '',
      cityId: block? (block?.cityId || '') : currentCity ? currentCity.id : '',
      position: block?.position || 0,
      isPublished: block?.isPublished || false,
      storiesGroups: block?.storiesGroups || [],
    },
    validate: storiesBlockFormValidate,
    onSubmit: (values) => {
      onSubmit(values);
    },
  });

  const citySelect = cities.map((city) => (
    <option key={city.id} value={city.id}>{city.cityName}</option>));

  return (
    <>
      <Form
        name={`block-form-${name}`}
        onSubmit={(e) => {
          formik.handleSubmit(e);
          setValidated(true);
        }}
        noValidate
        className='text-center'
        validated={validated}
        >
        <fieldset disabled={(
          updateStoriesBlockStatus === 'loading' || createStoriesBlockStatus === 'loading'
        )}>
          <FormInput
            title='Название блока'
            type='text'
            name='title'
            id={`title-block-${name}`}
            placeholder='Введите название'
            required
            autoFocus
            onChange={formik.handleChange}
            value={formik.values.title}
            error={formik.errors.title}
          />

          <Form.Group className='mb-3'>
            <Form.Label className='h6 mb-3' htmlFor={`cityId-block-${name}`}>
              Город
            </Form.Label>

            <Form.Select
              aria-label='выберите город'
              onChange={(e) => {
                formik.handleChange(e);
              }}
              required
              name='cityId'
              id={`cityId-block-${name}`}
              value={formik.values.cityId}
              >
              <option disabled value=''>Выберите город</option>
              {citySelect}
            </Form.Select>
            <Form.Control.Feedback type='invalid'>
              {formik.errors.cityId}
            </Form.Control.Feedback>
          </Form.Group>

          <FormInput
            title='Позиция блока'
            type='number'
            name='position'
            id={`position-block-${name}`}
            onChange={formik.handleChange}
            value={formik.values.position}
            error={formik.errors.position}
            min='0'
            step='1'
          />

          <Button
            variant='secondary'
            type='submit'
            aria-label={buttonText}
            className='mt-4'>
            {(updateStoriesBlockStatus === 'loading' || createStoriesBlockStatus === 'loading') ? 'Сохранение...' : buttonText}
          </Button>
        </fieldset>

      </Form>
    </>
  );
}

export default StoriesBlockForm;
