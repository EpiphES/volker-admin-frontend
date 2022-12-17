import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useFormik } from 'formik';

import { Form, Button } from 'react-bootstrap';

import * as api from '../../utils/api';
import { BASE_URL } from '../../utils/constants';
import { storiesItemFormValidate } from '../../utils/validation';

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
      handleSubmit(values);      
    },
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
      </Form>

      {uploadFileError && <Message type='danger' 
      title='Не получилось загрузить файл :(' text={`${uploadFileError}`} show={showUploadFileError} setShow={setShowUploadFileError} />}
    </>

  )
}

export default StoriesItemForm;