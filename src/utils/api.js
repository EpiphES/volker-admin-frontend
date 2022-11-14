import { BASE_URL, PROXY, UPLOAD_FOLDER } from "./constants";
import { changeFileName } from "./utils";

function checkResponse(res) {
  return res.ok ? res.json() : Promise.reject(`Ошибка: ${res.status}, ${res.statusText}`);
}

function checkSuccess(res) {
  if(res.IsSuccess === false) {
    return Promise.reject(`Ошибка: ${res.Error}`);
  }
  return res;  
}

function checkResponseNoBody(res) {
  return res.ok ? res : Promise.reject(`Ошибка: ${res.status}, ${res.statusText}`);
}

function request(url, options) {
  return fetch(url, options)
  .then(checkResponse)
  .then(checkSuccess);
 }


export function login({ email, password }) {
  return request(`${PROXY}${BASE_URL}Login/Login`, {
    method: 'POST',
    headers: { 
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ email, password })
  });  
}

export function getUserInfo(token) {
  return request(`${PROXY}${BASE_URL}User/GetUserInfo`, {
    method: 'GET',
    headers: {
      'Authorization': `Bearer ${token}`,
    }
  });
}

export function getAllCities(isPublished) {
  return request(`${PROXY}${BASE_URL}City/GetAllCities?isPublished=${isPublished}`, {
    method: 'GET',
    headers: {
      'Authorization': `Bearer ${localStorage.getItem('token')}`
    }
  });
}

export function getCityById(id) {
  return request(`${PROXY}${BASE_URL}City/GetCityById?id=${id}`, {
    method: 'GET',
    headers: {
      'Authorization': `Bearer ${localStorage.getItem('token')}`
    }
  });
}

export function createCity({cityName, latitude, longitude, description, modes}) {
  return request(`${PROXY}${BASE_URL}City/Create`, {
    method: 'POST',
    headers: { 
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${localStorage.getItem('token')}`,
    },
    body: JSON.stringify({cityName, latitude, longitude, description, modes})
  });  
}

export function updateCity({id, cityName, latitude, longitude, description, modes}) {
  return fetch(`${PROXY}${BASE_URL}City/Update?id=${id}`, {
    method: 'POST',
    headers: { 
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${localStorage.getItem('token')}`,
    },
    body: JSON.stringify({cityName, latitude, longitude, description, modes})
  })
  .then(checkResponseNoBody); 
}

export function deleteCity(id) {
  return fetch(`${PROXY}${BASE_URL}City/Delete?id=${id}`, {
    method: 'DELETE',
    headers: { 
      'Authorization': `Bearer ${localStorage.getItem('token')}`,
    }
  })
  .then(checkResponseNoBody);  
}

export function removeModeFromCity(cityId, modeId) {
  return fetch(`${PROXY}${BASE_URL}City/RemoveModeFromCity?cityId=${cityId}&modeId=${modeId}`, {
    method: 'DELETE',
    headers: { 
      'Authorization': `Bearer ${localStorage.getItem('token')}`,
    }
  })
  .then(checkResponseNoBody);  
}

export function getAllModes() {
  return request(`${PROXY}${BASE_URL}MarkerMode/GetAllMarkerModes`, {
    method: 'GET',
    headers: {
      'Authorization': `Bearer ${localStorage.getItem('token')}`
    }
  })
}

export function getModeById(modeId) {
  return request(`${PROXY}${BASE_URL}MarkerMode/GetMarkerModeById?modeId=${modeId}`, {
    method: 'GET',
    headers: {
      'Authorization': `Bearer ${localStorage.getItem('token')}`
    }
  });
}

export function createMode({title, icon, markerTypes}) {
  return request(`${PROXY}${BASE_URL}MarkerMode/CreateMode`, {
    method: 'POST',
    headers: { 
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${localStorage.getItem('token')}`,
    },
    body: JSON.stringify({title, icon, markerTypes})
  });  
}

export function updateMode({id, title, icon, markerTypes}) {
  return fetch(`${PROXY}${BASE_URL}MarkerMode/UpdateMode?id=${id}`, {
    method: 'POST',
    headers: { 
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${localStorage.getItem('token')}`,
    },
    body: JSON.stringify({title, icon, markerTypes})
  })
  .then(checkResponseNoBody); 
}

export function deleteMode(id) {
  return fetch(`${PROXY}${BASE_URL}MarkerMode/DeleteMode?id=${id}`, {
    method: 'DELETE',
    headers: { 
      'Authorization': `Bearer ${localStorage.getItem('token')}`,
    }
  })
  .then(checkResponseNoBody);  
}

export function createType({markerModeId, title, iconOnMap, colorOnMap}) {
  return request(`${PROXY}${BASE_URL}MarkerMode/CreateType`, {
    method: 'POST',
    headers: { 
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${localStorage.getItem('token')}`,
    },
    body: JSON.stringify({markerModeId, title, iconOnMap, colorOnMap})
  });  
}

export function updateType({id, title, iconOnMap, colorOnMap}) {
  return fetch(`${PROXY}${BASE_URL}MarkerMode/UpdateType?id=${id}`, {
    method: 'POST',
    headers: { 
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${localStorage.getItem('token')}`,
    },
    body: JSON.stringify({title, iconOnMap, colorOnMap})
  })
  .then(checkResponseNoBody); 
}

export function deleteType(id) {
  return fetch(`${PROXY}${BASE_URL}MarkerMode/DeleteType?id=${id}`, {
    method: 'DELETE',
    headers: { 
      'Authorization': `Bearer ${localStorage.getItem('token')}`,
    }
  })
  .then(checkResponseNoBody);  
}

export function uploadFile(file) {
  const formData = new FormData();
  const newFileName = changeFileName(file.name);  
  formData.append('file', file, newFileName);
  formData.append('folder', UPLOAD_FOLDER);
  return fetch(`${PROXY}${BASE_URL}File/Upload`, {
    method: 'POST',
    headers: { 
      'Authorization': `Bearer ${localStorage.getItem('token')}`,
    },
    body: formData,
  })
  .then(checkResponse);  
}

export function deleteFile(fileName) {
  return fetch(`${PROXY}${BASE_URL}File/Delete?folder=${UPLOAD_FOLDER}&fileName=${fileName}`, {
    method: 'POST',
    headers: { 
      'Authorization': `Bearer ${localStorage.getItem('token')}`,
    },
  })
  .then(checkResponseNoBody); 
}



