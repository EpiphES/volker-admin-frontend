import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useFormik } from 'formik';

import { Form, Button, Card } from 'react-bootstrap';

import { getCurrentCity, setCurrentCity } from '../../store/citySlice';
import { getModeById, setCurrentMode } from '../../store/modeSlice';

import { markerFormValidate } from '../../utils/validation';

import TypesGallery from '../TypesGallery/TypesGallery';
import ModalWithSelect from '../ModalWithSelect/ModalWithSelect';
import BtnScrollUp from '../BtnScrollUp/BtnScrollUp';
import Coordinates from '../Сoordinates/Coordinates';
import FormInput from '../FormInput/FormInput';

function MarkerForm({name, marker, buttonText, onSubmit}) {
  const [validated, setValidated] = useState(false);
  const dispatch = useDispatch();
  const [filteredCities, setFilteredCities] = useState([]);
  const [cityFilter, setCityFilter] = useState(true);
  const [selectedTypes, setSelectedTypes] = useState([]);
  const [filteredTypes, setFilteredTypes] = useState([]);
  const [showTypeSelectModal, setShowTypeSelectModal] = useState(false);
  const [images, setimages] = useState([]);

  const {
    updateMarkerStatus,  
    createMarkerStatus, 
  } = useSelector(state => state.marker);

  const {
    cities, 
    currentCity,
    currentCityStatus, 
    currentCityError,
  } = useSelector(state => state.city);

  const {
    modes,
    currentMode,
    currentModeStatus,
    currentModeError,
  } = useSelector(state => state.mode);

  const formik = useFormik({
    initialValues: {
      title: marker?.title || '',
      cityId: currentCity?.id || '',
      latitude: marker?.latitude || '',
      longitude: marker?.longitude || '',
      description: marker?.description || '',
      isMainPlace: marker?.isMainPlace || false,
      modeType:  marker?.modeType || '',
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
    },
    // validate: markerFormValidate,
    onSubmit: values => {
      console.log(values);
    //   onSubmit({
    //     title: values.title,
    //     cityId: values.cityId,
    //     latitude: values.latitude, 
    //     longitude: values.longitude,
    //   });      
    },
    onReset: () => {
      if(marker) {
        dispatch(getCurrentCity(marker.cityId));
        dispatch(getModeById(marker.modeType));
        setSelectedTypes(marker.markerTypes)
      } else {
        dispatch(setCurrentCity(null));
        dispatch(setCurrentMode(null));
        setSelectedTypes([]);
      }
    }
  });

  const citySelect = filteredCities?.map((city) => {
    return (<option key={city.id} value={city.id}>{city.cityName}</option>)
  });

  const modeSelect = (currentCity?.modes || modes).map((mode) => {
    return (<option key={mode.id} value={mode.id}>{mode.title}</option>)
  })

  function handleSelectCity(e) {
    if(!e.target.value) {
      dispatch(setCurrentCity(null));
      return;
    }
    dispatch(getCurrentCity(e.target.value));    
  }

  function handleChangeMode(e) {
    setSelectedTypes([]);
    if(!e.target.value) {
      dispatch(setCurrentMode(null));
      return;
    } 
    dispatch(getModeById(+e.target.value));
      
  }

  function toggleCityFilter() {
    setCityFilter(!cityFilter);
    formik.values.cityId ='';
  }

  function handleCloseTypeSelectModal() {
    setShowTypeSelectModal(false);
  };
  function handleShowTypeSelectModal() {
    setShowTypeSelectModal(true);
  } 
  
  function handleAddType(id) {    
    const type = currentMode.markerTypes.find(item => item.id === (+id));
    setSelectedTypes([...selectedTypes, type]);
  }

  function handleDeleteType(id) {
    setSelectedTypes(prevVal => {
      return prevVal.filter(item => item.id !== +id)
    })
  }

  useEffect(() => {
    if(formik.values.modeType && cityFilter) {
      const filteredCitiesArr = cities.filter((city) => {
        return city.modes.some((item) => item.id === +formik.values.modeType)
      });
      setFilteredCities(filteredCitiesArr);
      return;
    }
    setFilteredCities(cities);
  }, [cities, cityFilter, formik.values.modeType]);

  useEffect(() => {
    if(currentCity && currentMode && !currentCity.modes.some(item => item.id === currentMode.id)) {
      dispatch(setCurrentMode(null));
      formik.values.modeType = '';
      setSelectedTypes([]);
    }
  }, [currentCity, currentMode, dispatch]);

  useEffect(() => {
    if(marker) {
      dispatch(getModeById(marker.modeType));
      setSelectedTypes(marker.markerTypes);
    }
  }, [dispatch, marker]);

  useEffect(() => {
    if(currentMode) {
      const typeItems = currentMode.markerTypes.filter((type) => !selectedTypes.some(item => item.id === type.id));
      setFilteredTypes(typeItems);
    }
  }, [currentMode, selectedTypes]);

  return (
    <>
      <Form 
        name={`mode-form-${name}`}
        onSubmit={(e) => {
          formik.handleSubmit(e);
          setValidated(true);        
        }}
        noValidate
        className='pt-3 text-center mb-3 mx-auto'
        style={{maxWidth: '800px'}}
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
              {!formik.values.cityId ? 'Не выбран' 
                : currentCityStatus === 'loading' ? <small className='text-primary'>Идет загрузка...</small>
                : currentCityStatus === 'rejected' ? <small className='text-danger'>{currentCityError}</small>
                : currentCity?.cityName}
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
              required
              value={formik.values.cityId}>
              <option value=''>Выберите город</option>
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
            style={{maxWidth: '800px'}}>

            <Form.Group className='mb-3'>
              <Form.Label className='h6 mb-3' htmlFor={`modeType-marker-${name}`}>
                Режим отображения:
                {' '}
                {!formik.values.modeType ? 'Не выбран' 
                : currentModeStatus === 'loading' ? <small className='text-primary'>Идет загрузка...</small>
                : currentModeStatus === 'rejected' ? <small className='text-danger'>{currentModeError}</small>
                : currentMode?.title}
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

      <BtnScrollUp />

      <ModalWithSelect 
        items={filteredTypes}
        show={showTypeSelectModal}
        onClose={handleCloseTypeSelectModal}
        onSubmit={handleAddType}
        text='тип'
      />
    </>
  )
}

export default MarkerForm