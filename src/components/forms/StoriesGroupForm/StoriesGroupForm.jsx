import { useEffect, useState } from 'react';
import { Button, Form } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import { useFormik } from 'formik';

import * as api from '../../../utils/api';
import { BASE_URL } from '../../../utils/constants';
import { handleCompressImage } from '../../../utils/utils';
import { storiesGroupFormValidate } from '../../../utils/validation';
import FileInputCard from '../../cards/FileInputCard/FileInputCard.jsx';
import FormInput from '../../FormInput/FormInput.jsx';
import Message from '../../Message/Message.jsx';

function StoriesGroupForm({
  name, group, buttonText, submitHandler,
}) {
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
      title: group?.title || '',
      storiesBlockId: group ? group.storiesBlockId : currentStoriesBlock.id,
      position: group?.position || 0,
      storyItems: group?.storyItems || [],
    },
    validate: storiesGroupFormValidate,
    onSubmit: (values) => {
      handleSubmit(values);
    },
  });

  const blockSelect = storiesBlocks.map((item) => (
    <option key={item.id} value={item.id}>{item.title}</option>));

  function handleImageSelect(event) {
    setImageFile(event.target.files[0]);
  }
  function handleImageReset() {
    setImageFile(null);
  }

  useEffect(() => {
    if (!imageFile) {
      return group
        ? setGroupImage(group.image)
        : setGroupImage('');
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
        style={{ maxWidth: '800px' }}
        validated={validated}
        >
        <fieldset disabled={(
          updateStoriesGroupStatus === 'loading'
          || createStoriesGroupStatus === 'loading'
          || fileLoading
        )}>
          <FormInput
            title='???????????????? ????????????'
            type='text'
            name='title'
            id={`title-group-${name}`}
            placeholder='?????????????? ????????????????'
            required
            autoFocus
            onChange={formik.handleChange}
            value={formik.values.title}
            error={formik.errors.title}
          />

          <div style={{ width: '120px' }} className='mx-auto h-100 mb-3'>
            <FileInputCard
              name='group'
              onChange={handleImageSelect}
              imageLink={groupImage}
            />
          </div>

          <Form.Group className='mb-3'>
            <Form.Label className='h6 mb-3' htmlFor={`storiesBlockId-group-${name}`}>
              ????????
            </Form.Label>

            <Form.Select
              aria-label='???????????????? ????????'
              onChange={(e) => {
                formik.handleChange(e);
              }}
              required
              name='storiesBlockId'
              id={`storiesBlockId-group-${name}`}
              value={formik.values.storiesBlockId}
              >
              <option disabled value=''>???????????????? ????????</option>
              {blockSelect}
            </Form.Select>
            <Form.Control.Feedback type='invalid'>
              {formik.errors.storiesBlockId}
            </Form.Control.Feedback>
          </Form.Group>

          <FormInput
            title='?????????????? ?? ??????????'
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
            {(updateStoriesGroupStatus === 'loading' || createStoriesGroupStatus === 'loading') ? '????????????????????...' : buttonText}
          </Button>

          <Button
            variant='dark'
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

export default StoriesGroupForm;
