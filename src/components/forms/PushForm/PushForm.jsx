import { useEffect, useMemo, useState } from 'react';
import { Button, Form } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { useFormik } from 'formik';

import { getCurrentCity } from '../../../store/citySlice';
import {
  getAllMarkers,
} from '../../../store/markerSlice';
import {
  getStoriesBlocks,
} from '../../../store/storySlice';
import { pushFormValidate } from '../../../utils/validation';
import FormInput from '../../FormInput/FormInput.jsx';

function PushForm({ isLoading, handleSubmit }) {
  const [validated, setValidated] = useState(false);
  const dispatch = useDispatch();
  const [modes, setModes] = useState([]);

  const {
    cities,
    currentCity,
    currentCityStatus,
    currentCityError,
  } = useSelector((state) => state.city);

  const {
    markers,
  } = useSelector((state) => state.marker);

  const {
    storiesBlocks,
  } = useSelector((state) => state.story);

  const formik = useFormik({
    initialValues: {
      title: '',
      body: '',
      cityId: currentCity ? currentCity.id : '',
      modeId: '',
      markerId: '',
      storiesGroupId: '',
      rederictToUrl: '',
    },
    validate: pushFormValidate,
    onSubmit: (values) => {
      console.log(values);
      handleSubmit({
        title: values.title,
        body: values.body,
        cityId: values.cityId ? +values.cityId : null,
        modeId: values.modeId ? +values.modeId : null,
        markerId: values.markerId ? +values.markerId : null,
        storiesGroupId: values.storiesGroupId ? +values.storiesGroupId : null,
        rederictToUrl: values.rederictToUrl,
      });
    },
  });

  const stories = useMemo(() => storiesBlocks
    .reduce((prevVal, item) => [...prevVal, ...item.storiesGroups], []), [storiesBlocks]);

  const citySelect = cities.map((city) => (
    <option key={city.id} value={city.id}>{city.cityName}</option>));

  const modeSelect = modes.map((mode) => (
    <option key={mode.id} value={mode.id}>{mode.title}</option>
  ));

  const markerSelect = markers.map((marker) => (
    <option key={marker.id} value={marker.id}>{marker.title}</option>
  ));

  const storiesGroupSelect = stories.map((story) => (
    <option key={story.id} value={story.id}>{story.title}</option>
  ));

  function handleSelectCity(e) {
    if (e.target.value) {
      dispatch(getCurrentCity(e.target.value));
    }
  }

  useEffect(() => {
    if (currentCity && currentCity.id === parseInt(formik.values.cityId, 10)) {
      formik.values.modeId = '';
      formik.values.markerId = '';
      formik.values.storiesGroupId = '';
      setModes(currentCity.modes);
      dispatch(getStoriesBlocks(formik.values.cityId));
    }
  }, [currentCity, formik.values.cityId, dispatch]);

  useEffect(() => {
    if (formik.values.modeId) {
      formik.values.markerId = '';
      dispatch(getAllMarkers({
        cityId: formik.values.cityId,
        mode: parseInt(formik.values.modeId, 10),
        type: null,
        isPublished: null,
      }));
    }
  }, [dispatch, formik.values.modeId]);

  return (
    <Form
      name={'push-form'}
      onSubmit={(e) => {
        formik.handleSubmit(e);
        setValidated(true);
      }}
      noValidate
      className='text-center mb-4 mx-auto'
      style={{ maxWidth: '800px' }}
      validated={validated}
      >
      <fieldset disabled={isLoading}>
        <FormInput
          title='??????????????????'
          type='text'
          name='title'
          id={'title-push'}
          placeholder='?????????????? ??????????????????'
          autoFocus
          required
          onChange={formik.handleChange}
          value={formik.values.title}
          error={formik.errors.title}
        />

        <FormInput
          title='??????????????????'
          as='textarea'
          rows={3}
          name='body'
          required
          id={'body-push'}
          placeholder='?????????????? ??????????'
          onChange={formik.handleChange}
          value={formik.values.body}
          error={formik.errors.body}
        />

        <Form.Group className='mb-3'>
          <Form.Label className='h6 mb-3' htmlFor={'cityId-push'}>
            ?????????? ?????? ??????????????????????:
              {' '}
              { !formik.values.cityId ? '???? ????????????'
                : currentCityStatus === 'loading' ? <small className='text-primary'>???????? ????????????????...</small>
                  : currentCityStatus === 'rejected' ? <small className='text-danger'>{currentCityError}</small>
                    : currentCity?.cityName }
          </Form.Label>

          <Form.Select
            aria-label='???????????????? ??????????'
            onChange={(e) => {
              formik.handleChange(e);
              handleSelectCity(e);
            }}
            name='cityId'
            id={'cityId-push'}
            value={formik.values.cityId}
            >
            <option disabled value=''>???????????????? ??????????</option>
            {citySelect}
          </Form.Select>
          <Form.Control.Feedback type='invalid'>
            {formik.errors.cityId}
          </Form.Control.Feedback>
        </Form.Group>

        <Form.Group className='mb-3'>
          <Form.Label className='h6 mb-3' htmlFor={'modeId-push'}>
            ?????????? ?????? ??????????????????????:
          </Form.Label>
          <Form.Select
            aria-label='???????????????? ??????????'
            onChange={formik.handleChange}
            name='modeId'
            id={'modeId-push'}
            disabled={!formik.values.cityId}
            value={formik.values.modeId}>
            <option disabled value=''>???????????????? ??????????</option>
            {modeSelect}
          </Form.Select>
        </Form.Group>

        <Form.Group className='mb-3'>
          <Form.Label className='h6 mb-3' htmlFor={'markerId-push'}>
            ???????????? ?????? ??????????????????????:
          </Form.Label>
          <Form.Select
            aria-label='???????????????? ??????????'
            onChange={formik.handleChange}
            name='markerId'
            id={'markerId-push'}
            disabled={!formik.values.modeId}
            value={formik.values.markerId}>
            <option disabled value=''>???????????????? ????????????</option>
            {markerSelect}
          </Form.Select>
        </Form.Group>

        <Form.Group className='mb-3'>
          <Form.Label className='h6 mb-3' htmlFor={'storiesGroupId-push'}>
            ???????????? ?????? ??????????????????????:
          </Form.Label>
          <Form.Select
            aria-label='???????????????? ??????????'
            onChange={formik.handleChange}
            name='storiesGroupId'
            id={'storiesGroupId-push'}
            disabled={!formik.values.cityId}
            value={formik.values.storiesGroupId}>
            <option disabled value=''>???????????????? ????????????</option>
            {storiesGroupSelect}
          </Form.Select>
        </Form.Group>

        <FormInput
          title=''
          type='text'
          name='storiesGroupId'
          id={'storiesGroupId-push-text'}
          placeholder='?????????????? id ??????????????'
          onChange={formik.handleChange}
          value={formik.values.storiesGroupId}
        />

        <FormInput
          title='???????????? ?????? ??????????????????'
          type='text'
          name='rederictToUrl'
          id={'rederictToUrl-push'}
          placeholder='?????????????? ????????????'
          onChange={formik.handleChange}
          value={formik.values.rederictToUrl}
        />

        <Button
          variant='dark'
          type='submit'
          aria-label='??????????????????'
          className='mt-4'>
          {isLoading ? '????????????????...' : '??????????????????'}
        </Button>

        <Button
          variant='dark'
          type='reset'
          aria-label='???????????????? ??????????????????'
          onClick={formik.handleReset}
          className='ms-2 mt-4'>
          ???????????????? ??????????????????
        </Button>

      </fieldset>
    </Form>
  );
}

export default PushForm;
