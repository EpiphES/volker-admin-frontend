import { useEffect, useState } from 'react';
import { Button, Form } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import { useFormik } from 'formik';

import * as api from '../../../utils/api';
import { BASE_URL } from '../../../utils/constants';
import { handleCompressImage } from '../../../utils/utils';
import { storiesItemFormValidate } from '../../../utils/validation';
import FileInputCard from '../../cards/FileInputCard/FileInputCard.jsx';
import FormInput from '../../FormInput/FormInput.jsx';
import Message from '../../Message/Message.jsx';

function StoriesItemForm({
  name, storyItem, buttonText, submitHandler,
}) {
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
  } = useSelector((state) => state.story);

  function handleSubmit(values) {
    if (imageFile) {
      setUploadFileError(null);
      setFileLoading(true);
      handleCompressImage(imageFile)
        .then((res) => api.uploadFile(res))
        .then((res) => {
          const imageUrl = BASE_URL + res;
          submitHandler({ imageUrl, ...values });
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
    onSubmit: (values) => {
      handleSubmit(values);
    },
  });

  function handleImageSelect(event) {
    setImageFile(event.target.files[0]);
  }
  function handleImageReset() {
    setImageFile(null);
  }

  useEffect(() => {
    if (!imageFile) {
      return storyItem
        ? setItemImage(storyItem.image)
        : setItemImage('');
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
          updateStoriesItemStatus === 'loading'
          || createStoriesItemStatus === 'loading'
          || fileLoading
        )}>
          <FormInput
            title='???????????????? ????????????'
            type='text'
            name='title'
            id={`title-item-${name}`}
            placeholder='?????????????? ????????????????'
            autoFocus
            onChange={formik.handleChange}
            value={formik.values.title}
          />

          <div style={{ width: '280px' }} className='mx-auto h-100 mb-3'>
            <FileInputCard
              name='item'
              onChange={handleImageSelect}
              imageLink={itemImage}
            />
          </div>

          <FormInput
            title='????????????????'
            as='textarea'
            rows={3}
            name='message'
            id={`message-item-${name}`}
            placeholder='???????????????? ??????-????????????'
            onChange={formik.handleChange}
            value={formik.values.message}
          />

          <FormInput
            title='?????????????? ?? ????????????'
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
            title='???????????????? ????????????'
            type='text'
            name='buttonName'
            id={`buttonName-item-${name}`}
            placeholder='?????????????? ????????????????'
            onChange={formik.handleChange}
            value={formik.values.buttonName}
          />

          <FormInput
            title='???????????? ???? ????????????????'
            type='text'
            name='actionLink'
            id={`actionLink-item-${name}`}
            placeholder='?????????????? ????????????????'
            autoFocus
            onChange={formik.handleChange}
            value={formik.values.actionLink}
          />

         <Button
            variant='secondary'
            type='submit'
            aria-label={buttonText}
            className='mt-3'>
            {(updateStoriesItemStatus === 'loading' || createStoriesItemStatus === 'loading') ? '????????????????????...' : buttonText}
          </Button>

          <Button
            variant='secondary'
            type='reset'
            aria-label='???????????????? ??????????????????'
            onClick={(e) => {
              formik.handleReset(e);
              handleImageReset();
            }}
            className='ms-2 mt-3'>
            ???????????????? ??????????????????
          </Button>

        </fieldset>
      </Form>

      {uploadFileError && <Message type='danger'
      title='???? ???????????????????? ?????????????????? ???????? :(' text={uploadFileError} show={showUploadFileError} setShow={setShowUploadFileError} />}
    </>
  );
}

export default StoriesItemForm;
