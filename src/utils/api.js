const BASE_URL = 'http://volker.stairenx.com:81';
const PROXY = 'http://cors-anywhere.herokuapp.com/';
const credentials = {
  email: 'stairenx@yandex.ru',
  password: '89129384461'
}

function checkResponse(res) {
  return res.ok ? res.json() : Promise.reject(`Ошибка: ${res.status}, ${res.statusText}`);
}

function checkSuccess(res) {
  if(res.IsSuccess === false) {
    return Promise.reject(`Ошибка: ${res.Error}`);
  }
  return res;  
}

function request(url, options) {
  return fetch(url, options)
  .then(checkResponse)
  .then(checkSuccess);
 }


export function login({ email, password }) {
  return request(`${PROXY}${BASE_URL}/Login/Login`, {
    method: 'POST',
    headers: { 
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ email, password }),
  })  
}

export function getUserInfo(token) {
  return request(`${PROXY}${BASE_URL}/User/GetUserInfo`, {
    method: 'GET',
    headers: {
      'Authorization': `Bearer ${token}`,
    },
  })
}

export function getAllCities(isPublished) {
  return request(`${PROXY}${BASE_URL}/City/GetAllCities?isPublished=${isPublished}`, {
    method: 'GET',
    headers: {
      'Authorization': `Bearer ${localStorage.getItem('token')}`
    }
  })
}

export function getCityById(id) {
  return request(`${PROXY}${BASE_URL}/City/GetCityById?id=${id}`, {
    method: 'GET',
    headers: {
      'Authorization': `Bearer ${localStorage.getItem('token')}`
    }
  })
}

export function getAllModes() {
  return request(`${PROXY}${BASE_URL}/MarkerMode/GetAllMarkerModes`, {
    method: 'GET',
    headers: {
      'Authorization': `Bearer ${localStorage.getItem('token')}`
    }
  })
}

