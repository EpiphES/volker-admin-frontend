import { useState } from 'react';
import { useSelector } from 'react-redux';
import { useFormik } from 'formik';

import { Form, Button } from 'react-bootstrap';

import { storiesGroupFormValidate } from '../../utils/validation';

import FormInput from '../FormInput/FormInput';

function StoriesGroupForm({name, group, buttonText, onSubmit}) {
  const [validated, setValidated] = useState(false);

  const {
    storiesBlocks,
    currentStoriesBlock,
    updateStoriesGroupStatus,  
    createStoriesGroupStatus, 
  } = useSelector(state => state.story);

  const formik = useFormik({
    initialValues: {
      title: group?.title || '',
      storiesBlockId: group ? group.storiesBlockId : currentStoriesBlock.id,
      position: group?.position || 0,
      image: group?.image || '',
      storyItems: group?.storyItems || [],
    },
    validate: storiesGroupFormValidate,
    onSubmit: values => {
      console.log(values);
      // onSubmit(values);      
    },
  });

  const blockSelect = storiesBlocks.map((item) => {
    return (<option key={item.id} value={item.id}>{item.title}</option>)
  });

  return (
    <>
      <Form 
        name={`group-form-${name}`}
        onSubmit={(e) => {
          formik.handleSubmit(e);
          setValidated(true);        
        }}
        noValidate
        className='text-center mx-auto'
        style={{maxWidth: '800px'}}
        validated={validated}
        >
        <fieldset disabled={(
          updateStoriesGroupStatus === 'loading' || createStoriesGroupStatus === 'loading'
        )}>
          <FormInput
            title='Название группы'
            type='text'
            name='title'
            id={`title-group-${name}`} 
            placeholder='Введите название'
            required 
            autoFocus
            onChange={formik.handleChange}
            value={formik.values.title}
            error={formik.errors.title}
          />

          <Form.Group className='mb-3'>
            <Form.Label className='h6 mb-3' htmlFor={`storiesBlockId-group-${name}`}>
              Блок              
            </Form.Label>
            
            <Form.Select 
              aria-label='выберите блок' 
              onChange={(e) => {
                formik.handleChange(e);
              }}
              required
              name='storiesBlockId'
              id={`storiesBlockId-group-${name}`}
              value={formik.values.storiesBlockId}
              >
              <option disabled value=''>Выберите блок</option>
              {blockSelect}
            </Form.Select>
            <Form.Control.Feedback type='invalid'>
              {formik.errors.storiesBlockId}
            </Form.Control.Feedback>
          </Form.Group>

          <FormInput
            title='Позиция блока'
            type='number'
            name='position'
            id={`position-group-${name}`} 
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
            {(updateStoriesGroupStatus === 'loading' || createStoriesGroupStatus === 'loading') ? 'Сохранение...' : buttonText}
          </Button>
        </fieldset>

      </Form>
    </>
  )
}

export default StoriesGroupForm