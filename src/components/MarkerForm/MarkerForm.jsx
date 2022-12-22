import { useEffect, useState } from 'react';
import { Button, Card, Form } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { useFormik } from 'formik';

import { getCurrentCity } from '../../store/citySlice';
import { getModeById, setCurrentMode } from '../../store/modeSlice';
import * as api from '../../utils/api';
import { BASE_URL } from '../../utils/constants';
import { getFileNameFromUrl, handleCompressImage } from '../../utils/utils';
import { markerFormValidate } from '../../utils/validation';
import ConfirmationPopup from '../ConfirmationPopup/ConfirmationPopup.jsx';
import Coordinates from '../Coordinates/Coordinates.jsx';
import FormInput from '../FormInput/FormInput.jsx';
import ImageGallery from '../ImageGallery/ImageGallery.jsx';
import ModalWithSelect from '../ModalWithSelect/ModalWithSelect.jsx';
import TypesGallery from '../TypesGallery/TypesGallery.jsx';

function MarkerForm({
  name, marker, buttonText, onSubmit,
}) {
  const [validated, setValidated] = useState(false);
  const dispatch = useDispatch();
  const [filteredCities, setFilteredCities] = useState([]);
  const [cityFilter, setCityFilter] = useState(true);
  const [selectedTypes, setSelectedTypes] = useState([]);
  const [filteredTypes, setFilteredTypes] = useState([]);
  const [showTypeSelectModal, setShowTypeSelectModal] = useState(false);
  const [images, setImages] = useState([]);
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [deletedImage, setDeletedImage] = useState('');

  const {
    updateMarkerStatus,
    createMarkerStatus,
  } = useSelector((state) => state.marker);

  const {
    cities,
    currentCity,
    currentCityStatus,
    currentCityError,
  } = useSelector((state) => state.city);

  const {
    modes,
    currentMode,
    currentModeStatus,
    currentModeError,
  } = useSelector((state) => state.mode);

  const formik = useFormik({
    initialValues: {
      title: marker?.title || '',
      cityId: marker? (marker?.cityId || '') : currentCity ? currentCity.id : '',
      latitude: marker?.latitude || '',
      longitude: marker?.longitude || '',
      description: marker?.description || '',
      isMainPlace: marker?.isMainPlace || false,
      modeType: marker?.modeType || '',
      address: marker?.address || '',
      createAuthor: marker?.createAuthor || '',
      createDate: marker?.createDate || '',
      actionUrl: marker?.actionUrl || '',
      actionName: marker?.actionName || '',
      webCameraUrl: marker?.webCameraUrl || '',
      societyWebUrl: marker?.societyWebUrl || '',
      societyInstagramUrl: marker?.societyInstagramUrl || '',
      societyVkUrl: marker?.societyVkUrl || '',
      societyFacebookUrl: marker?.societyFacebookUrl || '',
      phones: marker?.phones.join(', ') || '',
      isConfirmed: marker?.isConfirmed || false,
      isPublished: marker?.isPublished || true,
    },
    validate: markerFormValidate,
    onSubmit: (values) => {
      if (selectedTypes.length === 0) {
        return;
      }
      onSubmit({
        title: values.title,
        cityId: values.cityId ? +values.cityId : null,
        latitude: values.latitude,
        longitude: values.longitude,
        description: values.description,
        isMainPlace: values.isMainPlace,
        modeType: parseInt(values.modeType, 10),
        markerTypes: selectedTypes,
        address: values.address,
        createAuthor: values.createAuthor,
        createDate: values.createDate,
        actionUrl: values.actionUrl,
        actionName: values.actionName,
        webCameraUrl: values.webCameraUrl,
        societyWebUrl: values.societyWebUrl,
        societyInstagramUrl: values.societyInstagramUrl,
        societyVkUrl: values.societyVkUrl,
        societyFacebookUrl: values.societyFacebookUrl,
        phones: values.phones.split(/,\s*/),
        isConfirmed: values.isConfirmed,
        isPublished: values.isPublished,
        images,
      });
    },
    onReset: () => {
      if (marker) {
        dispatch(getModeById(marker.modeType));
        setSelectedTypes(marker.markerTypes);
        if (marker.cityId) {
          dispatch(getCurrentCity(marker.cityId));
        }
      } else {
        dispatch(setCurrentMode(null));
        setSelectedTypes([]);
      }
    },
  });

  const citySelect = filteredCities?.map((city) => (
    <option key={city.id} value={city.id}>{city.cityName}</option>
  ));

  const modeSelect = (formik.values.cityId && currentCity ? currentCity.modes : modes)
    .map((mode) => (<option key={mode.id} value={mode.id}>{mode.title}</option>));

  function handleSelectCity(e) {
    if (e.target.value) {
      dispatch(getCurrentCity(e.target.value));
    }
  }

  function handleChangeMode(e) {
    setSelectedTypes([]);
    if (!e.target.value) {
      dispatch(setCurrentMode(null));
      return;
    }
    dispatch(getModeById(+e.target.value));
  }

  function toggleCityFilter() {
    setCityFilter(!cityFilter);
    formik.values.cityId = '';
  }

  function handleCloseTypeSelectModal() {
    setShowTypeSelectModal(false);
  }
  function handleShowTypeSelectModal() {
    setShowTypeSelectModal(true);
  }

  function handleAddType(id) {
    const type = currentMode.markerTypes.find((item) => item.id === (+id));
    setSelectedTypes([...selectedTypes, type]);
  }

  function handleDeleteType(id) {
    setSelectedTypes((prevVal) => prevVal.filter((item) => item.id !== +id));
  }

  function handleLoadImage(e) {
    if (e.target.files.length > 0) {
      handleCompressImage(e.target.files[0])
        .then((res) => api.uploadFile(res))
        .then((res) => {
          const iconUrl = BASE_URL + res;
          setImages((prevVal) => [iconUrl, ...prevVal]);
        })
        .catch((err) => console.error(err));
    }
  }

  function handleCloseConfirmModal() {
    setShowConfirmModal(false);
    setDeletedImage('');
  }
  function handleShowConfirmModal(url) {
    setShowConfirmModal(true);
    setDeletedImage(url);
  }

  function handleDeleteImage() {
    const fileName = getFileNameFromUrl(deletedImage);
    api.deleteFile(fileName)
      .then(() => {
        setImages((prevVal) => prevVal.filter((item) => item !== deletedImage));
      })
      .catch((err) => {
        console.error(err);
      })
      .finally(() => handleCloseConfirmModal());
  }

  useEffect(() => {
    if (formik.values.modeType && cityFilter) {
      const filteredCitiesArr = cities.filter(
        (city) => city.modes.some(
          (item) => item.id === parseInt(formik.values.modeType, 10),
        ),
      );
      setFilteredCities(filteredCitiesArr);
      return;
    }
    setFilteredCities(cities);
  }, [cities, cityFilter, formik.values.modeType]);

  useEffect(() => {
    if (formik.values.cityId && currentCity && currentMode && !currentCity?.modes
      .some((item) => item.id === currentMode.id)) {
      dispatch(setCurrentMode(null));
      formik.values.modeType = '';
      setSelectedTypes([]);
    }
  }, [currentCity, currentMode, dispatch, formik.values.cityId]);

  useEffect(() => {
    if (marker) {
      dispatch(getModeById(marker.modeType));
      setSelectedTypes(marker.markerTypes);
      setImages(marker.images);
    }
  }, [marker, dispatch]);

  useEffect(() => {
    if (currentMode) {
      const typeItems = currentMode.markerTypes
        .filter((type) => !selectedTypes.some((item) => item.id === type.id));
      setFilteredTypes(typeItems);
    }
  }, [currentMode, selectedTypes]);

  return (
    <>
      <Card
        body
        className='shadow-sm mb-3 mt-2 mx-auto'
        border='primary'>
        <h6 className='mb-3 text-center'>Изображения</h6>
        <ImageGallery
          images={images}
          onAddClick={handleLoadImage}
          onDelete={handleShowConfirmModal}/>
      </Card>

      <Form
        name={`mode-form-${name}`}
        onSubmit={(e) => {
          formik.handleSubmit(e);
          setValidated(true);
        }}
        noValidate
        className='text-center mb-4 mx-auto'
        style={{ maxWidth: '800px' }}
        validated={validated}
        >
        <fieldset disabled={(
          updateMarkerStatus === 'loading' || createMarkerStatus === 'loading'
        )}>

          <FormInput
            title='Название маркера'
            type='text'
            name='title'
            id={`title-marker-${name}`}
            placeholder='Введите название'
            required
            autoFocus
            onChange={formik.handleChange}
            value={formik.values.title}
            error={formik.errors.title}
          />

          <Form.Group className='mb-3'>
            <Form.Label className='h6 mb-3' htmlFor={`cityId-marker-${name}`}>
              Город нахождения:
              {' '}
              { !formik.values.cityId ? 'Не выбран'
                : currentCityStatus === 'loading' ? <small className='text-primary'>Идет загрузка...</small>
                : currentCityStatus === 'rejected' ? <small className='text-danger'>{currentCityError}</small>
                : currentCity?.cityName }
            </Form.Label>
            <Form.Check
              type='checkbox'
              name='city-filter'
              id='city-filter'
              label='Показать города, где есть такой режим'
              checked={cityFilter}
              onChange={toggleCityFilter}
              className='mb-3 d-flex align-content-center justify-content-center gap-2'
            />
            <Form.Select
              aria-label='выберите город'
              onChange={(e) => {
                formik.handleChange(e);
                handleSelectCity(e);
              }}
              name='cityId'
              id={`cityId-marker-${name}`}
              value={formik.values.cityId}>
              <option value=''>Доступно во всех городах с данным режимом</option>
              {citySelect}
            </Form.Select>
            <Form.Control.Feedback type='invalid'>
              {formik.errors.cityId}
            </Form.Control.Feedback>
          </Form.Group>

          <Coordinates
            onChange={formik.handleChange}
            latitudeValue={formik.values.latitude}
            latitudeError={formik.errors.latitude}
            longitudeValue={formik.values.longitude}
            longitudeError={formik.errors.longitude}
          />

          <FormInput
            title='Описание'
            as='textarea'
            rows={5}
            name='description'
            id={`description-marker-${name}`}
            placeholder='Напишите что-нибудь'
            onChange={formik.handleChange}
            value={formik.values.description}
          />

          <Form.Group className='mb-3'>
            <Form.Label className='h6 mb-2' htmlFor={`isMainPlace-marker-${name}`}>Основное место города</Form.Label>
            <Form.Check
              type='switch'
              name='isMainPlace'
              checked={formik.values.isMainPlace}
              onChange={formik.handleChange}
              id={`isMainPlace-marker-${name}`}
            />
          </Form.Group>

          <Card
            body
            className='shadow-sm mb-3 mt-2 mx-auto'
            border='primary'
            style={{ maxWidth: '800px' }}>

            <Form.Group className='mb-3'>
              <Form.Label className='h6 mb-3' htmlFor={`modeType-marker-${name}`}>
                Режим отображения:
                {' '}
                { !formik.values.modeType ? 'Не выбран'
                : currentModeStatus === 'loading' ? <small className='text-primary'>Идет загрузка...</small>
                : currentModeStatus === 'rejected' ? <small className='text-danger'>{currentModeError}</small>
                : currentMode?.title }
              </Form.Label>
              <Form.Select
                aria-label='выберите режим'
                onChange={(e) => {
                  formik.handleChange(e);
                  handleChangeMode(e);
                }}
                name='modeType'
                id={`modeType-marker-${name}`}
                required
                value={formik.values.modeType}>
                <option disabled value=''>Выберите режим</option>
                {modeSelect}
              </Form.Select>
              <Form.Control.Feedback type='invalid'>
                {formik.errors.modeType}
              </Form.Control.Feedback>
            </Form.Group>

            <h6 className='mb-3 text-center'>Типы</h6>
            <TypesGallery
              markerTypes={selectedTypes}
              onDelete={handleDeleteType}
              onAddClick={handleShowTypeSelectModal}
              place='marker'
            />

            {
              validated
              && selectedTypes.length === 0
              && <small className='text-danger'>Необходимо выбрать тип</small>
            }
          </Card>

          <FormInput
            title='Адрес'
            type='text'
            name='address'
            id={`address-marker-${name}`}
            placeholder='Введите адрес'
            onChange={formik.handleChange}
            value={formik.values.address}
          />

          <FormInput
            title='Контакты'
            type='text'
            name='phones'
            id={`phones-marker-${name}`}
            placeholder='Введите номера телефонов через запятую'
            onChange={formik.handleChange}
            value={formik.values.phones}
          />

          <FormInput
            title='Автор работы'
            type='text'
            name='createAuthor'
            id={`createAuthor-marker-${name}`}
            placeholder='Введите имя автора'
            onChange={formik.handleChange}
            value={formik.values.createAuthor}
          />

          <FormInput
            title='Дата создания'
            type='text'
            name='createDate'
            id={`createDate-marker-${name}`}
            placeholder='Введите дату'
            onChange={formik.handleChange}
            value={formik.values.createDate}
          />

          <FormInput
            title='Ссылка на вебкамеру'
            type='text'
            name='webCameraUrl'
            id={`webCameraUrl-marker-${name}`}
            placeholder='Введите ссылку'
            onChange={formik.handleChange}
            value={formik.values.webCameraUrl}
          />

          <FormInput
            title='Ссылка на действие'
            type='text'
            name='actionUrl'
            id={`actionUrl-marker-${name}`}
            placeholder='Введите ссылку'
            onChange={formik.handleChange}
            value={formik.values.actionUrl}
          />

          <FormInput
            title='Название действия'
            type='text'
            name='actionName'
            id={`actionName-marker-${name}`}
            placeholder='Введите название'
            onChange={formik.handleChange}
            value={formik.values.actionName}
          />

          <FormInput
            title='Ссылка на сайт'
            type='text'
            name='societyWebUrl'
            id={`societyWebUrl-marker-${name}`}
            placeholder='Введите ссылку'
            onChange={formik.handleChange}
            value={formik.values.societyWebUrl}
          />

          <FormInput
            title='Instagram'
            type='text'
            name='societyInstagramUrl'
            id={`societyInstagramUrl-marker-${name}`}
            placeholder='Введите ссылку'
            onChange={formik.handleChange}
            value={formik.values.societyInstagramUrl}
          />

          <FormInput
            title='VK'
            type='text'
            name='societyVkUrl'
            id={`societyVkUrl-marker-${name}`}
            placeholder='Введите ссылку'
            onChange={formik.handleChange}
            value={formik.values.societyVkUrl}
          />

          <FormInput
            title='Facebook'
            type='text'
            name='societyFacebookUrl'
            id={`societyFacebookUrl-marker-${name}`}
            placeholder='Введите ссылку'
            onChange={formik.handleChange}
            value={formik.values.societyFacebookUrl}
          />

          <Form.Group className='mb-3 d-flex justify-content-center gap-2'>
            <Form.Label className='h6 mb-2' htmlFor={`isConfirmed-marker-${name}`}>Проверено на актуальность</Form.Label>
            <Form.Check
              type='checkbox'
              name='isConfirmed'
              checked={formik.values.isConfirmed}
              onChange={formik.handleChange}
              id={`isConfirmed-marker-${name}`}
            />
          </Form.Group>

          <Button
            variant='dark'
            type='submit'
            aria-label={buttonText}
            className='mt-4'>
            {(updateMarkerStatus === 'loading' || createMarkerStatus === 'loading') ? 'Сохранение...' : buttonText}
          </Button>

          <Button
            variant='dark'
            type='reset'
            aria-label='очистить изменения'
            onClick={() => {
              formik.handleReset();
            }}
            className='ms-2 mt-4'>
            Очистить изменения
          </Button>
        </fieldset>
      </Form>

      { name === 'update' && images.length > 0
      && <small className='text-danger d-block text-center mb-2' >Перед удалением маркера желательно удалить все изображения</small> }

      <ModalWithSelect
        items={filteredTypes}
        show={showTypeSelectModal}
        onClose={handleCloseTypeSelectModal}
        onSubmit={handleAddType}
        text='тип'
      />

      <ConfirmationPopup
        text={'Удалить изображение?'}
        show={showConfirmModal}
        onClose={handleCloseConfirmModal}
        onConfirm={handleDeleteImage}
        onDecline={handleCloseConfirmModal}
      />
    </>
  );
}

export default MarkerForm;
