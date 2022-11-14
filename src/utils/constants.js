const BASE_URL = 'http://volker.stairenx.com:81/';
const PROXY = 'http://cors-anywhere.herokuapp.com/';
const UPLOAD_FOLDER = 'images';

const credentials = {
  email: 'stairenx@yandex.ru',
  password: '89129384461'
}

const EMAIL_REGEX = '^[A-Z0-9._%+-]+@[A-Z0-9.-]+\\.[A-Z]{2,4}$';

const LAT_REGEX = '^[-+]?([1-8]?\\d(\\.\\d+)?|90(\\.0+)?)$';

const LON_REGEX = '^[-+]?(180(\\.0+)?|((1[0-7]\\d)|([1-9]?\\d))(\\.\\d+)?)$'


export {
  BASE_URL,
  PROXY,
  UPLOAD_FOLDER,
  EMAIL_REGEX,
  LAT_REGEX,
  LON_REGEX
}