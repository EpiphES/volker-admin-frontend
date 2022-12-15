import { EMAIL_REGEX } from './constants';
import { LAT_REGEX, LON_REGEX } from './constants';

const emailRegexp = new RegExp(EMAIL_REGEX, 'i')
const latRegex = new RegExp(LAT_REGEX);
const lonRegex = new RegExp(LON_REGEX);

const loginFormValidate = values => {
  const errors = {};

  if (!values.email) {
    errors.email = 'Поле должно быть заполнено';
  } else if (!emailRegexp.test(values.email)) {
    errors.email = 'Некорректный адрес электронной почты';
  } 
  
  if (!values.password) {
    errors.password = 'Поле должно быть заполнено';
  } 
  
  return errors;
};

const cityFormValidate = values => {  
  const errors = {};

  if (!values.cityName) {
    errors.cityName = 'Поле должно быть заполнено';
  }

  if(values.latitude === '') {
    errors.latitude = 'Введите координаты';
  } else if (!latRegex.test(values.latitude)) {
    errors.latitude = 'Некорректное значение';
  }

  if(values.longitude === '') {
    errors.longitude = 'Введите координаты';
  } else if (!lonRegex.test(values.longitude)) {
    errors.longitude = 'Некорректное значение';
  } 

  return errors;
 };

 const modeFormValidate = values => {  
  const errors = {};

  if (!values.title) {
    errors.title = 'Поле должно быть заполнено';
  }

  return errors;
 };

const typeFormValidate = values => {
  const errors = {};

  if (!values.title) {
    errors.title = 'Поле должно быть заполнено';
  }

  if (!values.color) {
    errors.color = 'Надо выбрать цвет';
  }

  return errors;
};

const markerFormValidate = values => {  
  const errors = {};

  if (!values.title) {
    errors.title = 'Поле должно быть заполнено';
  }

  if(!values.latitude) {
    errors.latitude = 'Введите координаты';
  } else if (!latRegex.test(values.latitude)) {
    errors.latitude = 'Некорректное значение';
  }

  if(!values.longitude) {
    errors.longitude = 'Введите координаты';
  } else if (!lonRegex.test(values.longitude)) {
    errors.longitude = 'Некорректное значение';
  }

  if(!values.modeType) {
    errors.modeType = 'Необходимо выбрать режим';
  }

  return errors;
};

const storiesBlockFormValidate = values => {
  const errors = {};

  if (!values.title) {
    errors.title = 'Поле должно быть заполнено';
  }
  
  if(values.cityId === '') {
    errors.cityId = 'Необходимо выбрать город';
  }

  if(!Number.isInteger(values.position)) {
    errors.position = 'Введите целое число'
  }

  return errors;
};

const storiesGroupFormValidate = values => {
  const errors = {};

  if (!values.title) {
    errors.title = 'Поле должно быть заполнено';
  }

  if(values.storiesBlockId === '') {
    errors.storiesBlockId = 'Необходимо выбрать блок';
  }
  
  if(!Number.isInteger(values.position)) {
    errors.position = 'Введите целое число'
  }

  return errors;
};

export {
  loginFormValidate,
  cityFormValidate,
  modeFormValidate,
  typeFormValidate,
  markerFormValidate,
  storiesBlockFormValidate, 
  storiesGroupFormValidate
}