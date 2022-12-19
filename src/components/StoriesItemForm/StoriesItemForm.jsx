import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useFormik } from 'formik';

import { Form, Button } from 'react-bootstrap';

import * as api from '../../utils/api';
import { BASE_URL } from '../../utils/constants';
import { storiesItemFormValidate } from '../../utils/validation';
import { handleCompressImage } from '../../utils/utils';

import FormInput from '../FormInput/FormInput';
import FileInputCard from '../FileInputCard/FileInputCard';
import Message from '../Message/Message';

function StoriesItemForm({name, storyItem, buttonText, submitHandler}) {
  const [validated, setValidated] = useState(false);
  const [itemImage, setItemImage] = useState('');
  const [imageFile, setImageFile] = useState(null);
  const [showUploadFileError, setShowUploadFileError] = useState(false);
  const [uploadFileError, setUploadFileError] = useState(null);
  const [fileLoading, setFileLoading] = useState(false);

  const {
    currentStoriesGroup,
    updateStoriesItemStatus,  
    createStoriesItemStatus, 
  } = useSelector(state => state.story);

  const formik = useFormik({
    initialValues: {
      title: storyItem?.title || '',
      message: storyItem?.message || '',
      storiesGroupId: storyItem ? storyItem.storiesGroupId : currentStoriesGroup.id,
      position: storyItem?.position || 0,
      modeId: storyItem?.modeId || null,
      buttonName: storyItem?.buttonName || '',
      actionLink: storyItem?.actionLink || '', 
    },
    validate: storiesItemFormValidate,
    onSubmit: values => {
      console.log(values);
      handleSubmit(values);      
    },
  });

  function handleImageSelect(event) {
    setImageFile(event.target.files[0]);
    console.log('select');
  }

  function handleImageReset() {
    setImageFile(null);
  }

  function handleSubmit(values) {
    if(imageFile) {
      setUploadFileError(null);
      setFileLoading(true);
      handleCompressImage(imageFile)
      .then((res) => api.uploadFile(res))
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
      storyItem ?
      setItemImage(storyItem.image) 
      : setItemImage('');
      return
    }
    const objectUrl = URL.createObjectURL(imageFile);
    setItemImage(objectUrl);
    return () => URL.revokeObjectURL(objectUrl);
  }, [imageFile, storyItem]);

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
        validated={validated}
        >
        <fieldset disabled={(
          updateStoriesItemStatus === 'loading' || 
          createStoriesItemStatus === 'loading' || 
          fileLoading
        )}>
          <FormInput
            title='Название слайда'
            type='text'
            name='title'
            id={`title-item-${name}`} 
            placeholder='Введите название' 
            autoFocus
            onChange={formik.handleChange}
            value={formik.values.title}
          />

          <div style={{width: '280px'}} className='mx-auto h-100 mb-3'>
            <FileInputCard
              name='item'
              onChange={handleImageSelect}
              imageLink={itemImage}  
            />
          </div>

          <FormInput
            title='Описание'
            as='textarea'  
            rows={3}
            name='message'
            id={`message-item-${name}`}
            placeholder='Напишите что-нибудь'
            onChange={formik.handleChange}
            value={formik.values.message}
          />

          <FormInput
            title='Позиция в группе'
            type='number'
            name='position'
            id={`position-item-${name}`} 
            onChange={formik.handleChange}
            value={formik.values.position}
            error={formik.errors.position}
            min='0'
            step='1'           
          />

          <FormInput
            title='Название кнопки'
            type='text'
            name='buttonName'
            id={`buttonName-item-${name}`} 
            placeholder='Введите название' 
            onChange={formik.handleChange}
            value={formik.values.buttonName}
          />

          <FormInput
            title='Ссылка на действие'
            type='text'
            name='actionLink'
            id={`actionLink-item-${name}`} 
            placeholder='Введите название' 
            autoFocus
            onChange={formik.handleChange}
            value={formik.values.actionLink}
          />


          <Button
            variant='secondary'
            type='submit'
            aria-label={buttonText}
            className='mt-3'>
            {(updateStoriesItemStatus === 'loading' || createStoriesItemStatus === 'loading') ? 'Сохранение...' : buttonText}
          </Button>

          <Button
            variant='secondary'
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

export default StoriesItemForm;