import { BASE_URL, PROXY } from "./constants";

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
    body: JSON.stringify({ email, password })
  });  
}

export function getUserInfo(token) {
  return request(`${PROXY}${BASE_URL}/User/GetUserInfo`, {
    method: 'GET',
    headers: {
      'Authorization': `Bearer ${token}`,
    }
  });
}

export function getAllCities(isPublished) {
  return request(`${PROXY}${BASE_URL}/City/GetAllCities?isPublished=${isPublished}`, {
    method: 'GET',
    headers: {
      'Authorization': `Bearer ${localStorage.getItem('token')}`
    }
  });
}

export function getCityById(id) {
  return request(`${PROXY}${BASE_URL}/City/GetCityById?id=${id}`, {
    method: 'GET',
    headers: {
      'Authorization': `Bearer ${localStorage.getItem('token')}`
    }
  });
}

export function createCity({cityName, latitude, longitude, description, modes}) {
  return request(`${PROXY}${BASE_URL}/City/Create`, {
    method: 'POST',
    headers: { 
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${localStorage.getItem('token')}`,
    },
    body: JSON.stringify({cityName, latitude, longitude, description, modes})
  });  
}

export function updateCity({id, cityName, latitude, longitude, description, modes}) {
  return fetch(`${PROXY}${BASE_URL}/City/Update?id=${id}`, {
    method: 'POST',
    headers: { 
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${localStorage.getItem('token')}`,
    },
    body: JSON.stringify({cityName, latitude, longitude, description, modes})
  })
  .then((res) => res.ok ? res : Promise.reject(`Ошибка: ${res.status}, ${res.statusText}`)); 
}

export function deleteCity(id) {
  return fetch(`${PROXY}${BASE_URL}/City/Delete?id=${id}`, {
    method: 'DELETE',
    headers: { 
      'Authorization': `Bearer ${localStorage.getItem('token')}`,
    }
  })
  .then((res) => res.ok ? res : Promise.reject(`Ошибка: ${res.status}, ${res.statusText}`));  
}

export function removeModeFromCity(cityId, modeId) {
  return fetch(`${PROXY}${BASE_URL}/City/RemoveModeFromCity?cityId=${cityId}&modeId=${modeId}`, {
    method: 'DELETE',
    headers: { 
      'Authorization': `Bearer ${localStorage.getItem('token')}`,
    }
  })
  .then((res) => res.ok ? res : Promise.reject(`Ошибка: ${res.status}, ${res.statusText}`));  
}

export function getAllModes() {
  return request(`${PROXY}${BASE_URL}/MarkerMode/GetAllMarkerModes`, {
    method: 'GET',
    headers: {
      'Authorization': `Bearer ${localStorage.getItem('token')}`
    }
  })
}

