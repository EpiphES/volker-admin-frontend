import { useEffect, useState } from 'react';
import { Button, Form } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import { useFormik } from 'formik';

import * as api from '../../../utils/api';
import { BASE_URL } from '../../../utils/constants';
import { handleCompressImage } from '../../../utils/utils';
import { modeFormValidate } from '../../../utils/validation';
import FileInputCard from '../../cards/FileInputCard/FileInputCard.jsx';
import FormInput from '../../FormInput/FormInput.jsx';
import Message from '../../Message/Message.jsx';

function ModeForm({
  name, mode, buttonText, submitHandler,
}) {
  const [modeIcon, setModeIcon] = useState('');
  const [validated, setValidated] = useState(false);
  const [iconFile, setIconFile] = useState(null);
  const [showUploadFileError, setShowUploadFileError] = useState(false);
  const [uploadFileError, setUploadFileError] = useState(null);
  const [fileLoading, setFileLoading] = useState(false);

  const {
    updateModeStatus,
    createModeStatus,
  } = useSelector((state) => state.mode);

  function handleSubmit(values) {
    if (iconFile) {
      setUploadFileError(null);
      setFileLoading(true);
      handleCompressImage(iconFile)
        .then((res) => api.uploadFile(res))
        .then((res) => {
          const iconUrl = BASE_URL + res;
          submitHandler({ iconUrl, ...values });
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
      title: mode?.title || '',
    },
    validate: modeFormValidate,
    onSubmit: handleSubmit,
  });

  function handleIconSelect(event) {
    setIconFile(event.target.files[0]);
  }

  function handleIconReset() {
    setIconFile(null);
  }

  useEffect(() => {
    if (!iconFile) {
      return mode
        ? setModeIcon(mode.icon)
        : setModeIcon('');
    }
    const objectUrl = URL.createObjectURL(iconFile);
    setModeIcon(objectUrl);
    return () => URL.revokeObjectURL(objectUrl);
  }, [iconFile, mode]);

  return (
    <>
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
          updateModeStatus === 'loading'
          || createModeStatus === 'loading'
          || fileLoading
          )}>

          <FormInput
            title='???????????????? ????????????'
            type='text'
            name='title'
            id={`title-mode-${name}`}
            placeholder='?????????????? ????????????????'
            required
            autoFocus
            onChange={formik.handleChange}
            value={formik.values.title}
            error={formik.errors.title}
          />

          <h6 className='mb-2'>???????????? ????????????</h6>
          <div style={{ width: '120px' }} className='mx-auto'>
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
            {(updateModeStatus === 'loading' || createModeStatus === 'loading' || fileLoading) ? '????????????????????...' : buttonText}
          </Button>

          <Button
            variant='dark'
            type='reset'
            aria-label='???????????????? ??????????????????'
            onClick={(e) => {
              formik.handleReset(e);
              handleIconReset();
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

export default ModeForm;
