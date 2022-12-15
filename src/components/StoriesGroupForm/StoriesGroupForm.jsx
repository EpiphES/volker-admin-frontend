import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useFormik } from 'formik';

import { Form, Button } from 'react-bootstrap';

import * as api from '../../utils/api';
import { BASE_URL } from '../../utils/constants';
import { storiesGroupFormValidate } from '../../utils/validation';

import FormInput from '../FormInput/FormInput';
import FileInputCard from '../FileInputCard/FileInputCard';
import Message from '../Message/Message';

function StoriesGroupForm({name, group, buttonText, submitHandler}) {
  const [validated, setValidated] = useState(false);
  const [groupImage, setGroupImage] = useState('');
  const [imageFile, setImageFile] = useState(null);
  const [showUploadFileError, setShowUploadFileError] = useState(false);
  const [uploadFileError, setUploadFileError] = useState(null);
  const [fileLoading, setFileLoading] = useState(false);

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
      storyItems: group?.storyItems || [],
    },
    validate: storiesGroupFormValidate,
    onSubmit: values => {
      console.log(values);
      // handleSubmit(values);      
    },
  });

  const blockSelect = storiesBlocks.map((item) => {
    return (<option key={item.id} value={item.id}>{item.title}</option>)
  });

  function handleImageSelect(event) {
    setImageFile(event.target.files[0]);
  }

  function handleImageReset() {
    setImageFile(null);
  }

  function handleSubmit(values) {
    if(imageFile) {
      setUploadFileError(null);
      setFileLoading(true);
      api.uploadFile(imageFile)
      .then((res) => {
        const imageUrl = BASE_URL + res;
        submitHandler({imageUrl, ...values});
      })
      .catch((err) => {
        setUploadFileError(err);
        setShowUploadFileError(true);
      })
      .finally(() => setFileLoading(false));
    } else {
      submitHandler(values);
    }
  }

  useEffect(() => {
    if (!imageFile) {
      group ?
      setGroupImage(group.image) 
      : setGroupImage('');
      return
    }
    const objectUrl = URL.createObjectURL(imageFile);
    setGroupImage(objectUrl);
    return () => URL.revokeObjectURL(objectUrl);
  }, [imageFile, group]);

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
          updateStoriesGroupStatus === 'loading' || 
          createStoriesGroupStatus === 'loading' || 
          fileLoading
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

          <div style={{width: '120px'}} className='mx-auto h-100 mb-3'>
            <FileInputCard
              name='type'
              onChange={handleImageSelect}
              imageLink={groupImage}  
            />
          </div>

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
            title='Позиция в блоке'
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
            variant='dark'
            type='submit'
            aria-label={buttonText}
            className='mt-3'>
            {(updateStoriesGroupStatus === 'loading' || createStoriesGroupStatus === 'loading') ? 'Сохранение...' : buttonText}
          </Button>

          <Button
            variant='dark'
            type='reset'
            aria-label='очистить изменения'
            onClick={() => {
              formik.handleReset();
              handleImageReset();
            }}
            className='ms-2 mt-3'>
            Очистить изменения
          </Button>
        </fieldset>
      </Form>

      {uploadFileError && <Message type='danger' 
      title='Не получилось загрузить файл :(' text={`${uploadFileError}`} show={showUploadFileError} setShow={setShowUploadFileError} />}
    </>
  )
}

export default StoriesGroupForm