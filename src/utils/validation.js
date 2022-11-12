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

   if (!latRegex.test(values.latitude)) {
     errors.latitude = 'Некорректное значение';
   }
   
   if (!lonRegex.test(values.longitude)) {
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

export {
  loginFormValidate,
  cityFormValidate,
  modeFormValidate,
}