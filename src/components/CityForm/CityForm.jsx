import { useEffect, useState } from 'react';
import {
  Button, Col, Form, Row,
} from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { useFormik } from 'formik';

import { removeModeFromCity } from '../../store/citySlice';
import { cityFormValidate } from '../../utils/validation';
import AddCard from '../AddCard/AddCard.jsx';
import ConfirmationPopup from '../ConfirmationPopup/ConfirmationPopup.jsx';
import Coordinates from '../Coordinates/Coordinates.jsx';
import FormInput from '../FormInput/FormInput.jsx';
import ModalWithSelect from '../ModalWithSelect/ModalWithSelect.jsx';
import ModeCard from '../ModeCard/ModeCard.jsx';

function CityForm({
  name, city, buttonText, onSubmit,
}) {
  const dispatch = useDispatch();
  const { modes } = useSelector((state) => state.mode);
  const {
    updateCityStatus,
    createCityStatus,
    removeModeFromCityStatus,
  } = useSelector((state) => state.city);
  const [validated, setValidated] = useState(false);
  const [cityModes, setCityModes] = useState([]);
  const [filteredModes, setFilteredModes] = useState([]);
  const [deletedMode, setDeletedMode] = useState(null);
  const [showModeSelectModal, setShowModeSelectModal] = useState(false);
  const [showConfirmModal, setShowConfirmModal] = useState(false);

  function removeModes() {
    const modesToDelete = city.modes
      .filter((mode) => !cityModes.some((item) => item.id === mode.id));
    modesToDelete.forEach((mode) => {
      dispatch(removeModeFromCity({ cityId: city.id, modeId: mode.id }));
    });
  }

  const formik = useFormik({
    initialValues: {
      cityName: city?.cityName || '',
      latitude: city?.latitude || '',
      longitude: city?.longitude || '',
      description: city?.description || '',
    },
    validate: cityFormValidate,
    onSubmit: (values) => {
      if (name === 'update') {
        removeModes();
      }
      onSubmit({
        cityName: values.cityName,
        latitude: values.latitude,
        longitude: values.longitude,
        description: values.description,
        modes: cityModes,
      });
    },
    onReset: () => {
      setCityModes(city?.modes || []);
    },
  });

  function handleShowConfirmModal(id) {
    setShowConfirmModal(true);
    setDeletedMode(modes.find((item) => item.id === id));
  }

  function handleCloseConfirmModal() {
    setShowConfirmModal(false);
  }

  const cityModeCards = cityModes.map((item) => (
      <Col key={item.id}>
        <ModeCard item={item} onClick={handleShowConfirmModal} deleteOn/>
      </Col>
  ));

  function handleCloseModeSelectModal() {
    setShowModeSelectModal(false);
  }
  function handleShowModeSelectModal() {
    setShowModeSelectModal(true);
  }
  function handleAddMode(id) {
    const mode = modes.find((item) => item.id === +id);
    setCityModes((prevVal) => [...prevVal, mode]);
  }
  function handleDeleteMode() {
    setCityModes((prevVal) => prevVal.filter((item) => item.id !== deletedMode.id));
    setDeletedMode(null);
    setShowConfirmModal(false);
  }

  useEffect(() => {
    if (city?.modes) {
      setCityModes(city.modes);
    }
  }, [city]);

  useEffect(() => {
    const modeItems = modes.filter((mode) => !cityModes.some((item) => item.id === mode.id));
    setFilteredModes(modeItems);
  }, [cityModes, modes]);

  return (
    <>
      <Form
        name={`city-form-${name}`}
        onSubmit={(e) => {
          formik.handleSubmit(e);
          setValidated(true);
        }}
        noValidate
        className='pt-3 text-center mb-3 mx-auto'
        style={{ maxWidth: '800px' }}
        validated={validated}>

        <fieldset disabled={(updateCityStatus === 'loading' || createCityStatus === 'loading' || removeModeFromCityStatus === 'loading')}>

          <FormInput
            title='Название города'
            type='text'
            name='cityName'
            placeholder='Введите название'
            id={`cityName-city-${name}`}
            required
            autoFocus
            onChange={formik.handleChange}
            value={formik.values.cityName}
            error={formik.errors.cityName}
          />

          <Coordinates
            onChange={formik.handleChange}
            latitudeValue={formik.values.latitude}
            latitudeError={formik.errors.latitude}
            longitudeValue={formik.values.longitude}
            longitudeError={formik.errors.longitude}
          />

          <>
            <h6 className='mb-3'>Pежимы</h6>
            <Row xs={3} sm={4} md={5} className='g-2 h-100 mb-3'>
              {cityModeCards}
              <Col>
                < AddCard minHeight={'100px'} onClick={handleShowModeSelectModal} />
              </Col>
            </Row>
          </>

          <FormInput
            title='Описание'
            as='textarea'
            rows={5}
            name='description'
            id={`description-city-${name}`}
            placeholder='Напишите что-нибудь'
            onChange={formik.handleChange}
            value={formik.values.description}
          />

          <Button
            variant='dark'
            type='submit'
            aria-label={buttonText}
            className='mt-4 me-3'>
            {(updateCityStatus === 'loading' || createCityStatus === 'loading' || removeModeFromCityStatus === 'loading') ? 'Сохранение...' : buttonText}
          </Button>

          <Button
            variant='dark'
            type='reset'
            aria-label='отменить изменения'
            className='mt-4'
            onClick={formik.handleReset}
            >
            Отмена
          </Button>
        </fieldset>
      </Form>

      <ModalWithSelect
        items={filteredModes}
        show={showModeSelectModal}
        onClose={handleCloseModeSelectModal}
        onSubmit={handleAddMode}
        withSearch
        text='режим'
      />

      <ConfirmationPopup
        text={`Удалить режим "${deletedMode?.title}"?`}
        show={showConfirmModal}
        onClose={handleCloseConfirmModal}
        onConfirm={handleDeleteMode}
        onDecline={handleCloseConfirmModal}
      />
    </>
  );
}

export default CityForm;
