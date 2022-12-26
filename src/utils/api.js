/* eslint-disable prefer-promise-reject-errors */
import { BASE_URL, UPLOAD_FOLDER } from './constants';
import { changeFileName } from './utils';

function checkResponse(res) {
  return res.ok ? res.json() : Promise.reject(`Ошибка: ${res.status}, ${res.statusText}`);
}

function checkSuccess(res) {
  if (res.isSuccess === false) {
    return Promise.reject(`Ошибка: ${res.Error}`);
  }
  return res;
}

const api = {
  get(url) {
    return fetch(`${BASE_URL}${url}`, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    })
      .then(checkResponse);
  },
  post(url, values) {
    return fetch(`${BASE_URL}${url}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
      body: JSON.stringify(values),
    })
      .then(checkResponse)
      .then(checkSuccess);
  },
  delete(url) {
    return fetch(`${BASE_URL}${url}`, {
      method: 'DELETE',
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    })
      .then(checkResponse)
      .then(checkSuccess);
  },
};

export function login({ email, password }) {
  return fetch(`${BASE_URL}Login/Login`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ email, password }),
  })
    .then(checkResponse)
    .then(checkSuccess);
}

export function getUserInfo(token) {
  return fetch(`${BASE_URL}User/GetUserInfo`, {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })
    .then(checkResponse)
    .then(checkSuccess);
}

export function getAllCities(isPublished) {
  return api.get(`City/GetAllCities?isPublished=${isPublished}`);
}

export function getCityById(id) {
  return api.get(`City/GetCityById?id=${id}`);
}

export function createCity(values) {
  return api.post('City/Create', values);
}

export function updateCity(values) {
  return api.post(`City/Update?id=${values.id}`, values);
}

export function deleteCity(id) {
  return api.delete(`City/Delete?id=${id}`);
}

export function removeModeFromCity(cityId, modeId) {
  return api.delete(`City/RemoveModeFromCity?cityId=${cityId}&modeId=${modeId}`);
}

export function getAllModes() {
  return api.get('Mode/GetAllMarkerModes');
}

export function getModeById(modeId) {
  return api.get(`Mode/GetMarkerModeById?modeId=${modeId}`);
}

export function createMode(values) {
  return api.post('Mode/CreateMode', values);
}

export function updateMode(values) {
  return api.post(`Mode/UpdateMode?id=${values.id}`, values);
}

export function deleteMode(id) {
  return api.delete(`Mode/DeleteMode?id=${id}`);
}

export function createType(values) {
  return api.post('Mode/CreateType', values);
}

export function updateType(values) {
  return api.post(`Mode/UpdateType?id=${values.id}`, values);
}

export function deleteType(id) {
  return api.delete(`Mode/DeleteType?id=${id}`);
}

export function uploadFile(file) {
  const formData = new FormData();
  const newFileName = changeFileName(file.name);
  formData.append('file', file, newFileName);
  formData.append('folder', UPLOAD_FOLDER);
  return fetch(`${BASE_URL}File/Upload`, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${localStorage.getItem('token')}`,
    },
    body: formData,
  })
    .then(checkResponse);
}

export function deleteFile(fileName) {
  return fetch(`${BASE_URL}File/Delete?folder=${UPLOAD_FOLDER}&fileName=${fileName}`, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${localStorage.getItem('token')}`,
    },
  })
    .then(checkResponse);
}

export function getFilteredPaginatedMarkers({
  cityId, page, search, ...values
}) {
  return api.post(`Marker/GetMarkersOfPaging?cityId=${cityId}&page=${page}&search=${search}`, values);
}

export function getPaginatedMarkers({ cityId, page, search }) {
  return api.get(`Marker/GetMarkersOfPagingByCityId?cityId=${cityId}&page=${page}&search=${search}`);
}

export function getMarkerById(id) {
  return api.get(`Marker/GetMarkerById?id=${id}`);
}

export function createMarker(values) {
  return api.post('Marker/Create', values);
}

export function updateMarker(values) {
  return api.post(`Marker/Update?id=${values.id}`, values);
}

export function deleteMarker(id) {
  return api.delete(`Marker/Delete?id=${id}`);
}

export function getStoriesBlockById(id) {
  return api.get(`Stories/GetStoryBlockById?id=${id}`);
}

export function getStoriesGroupById(id) {
  return api.get(`Stories/GetStoriesByGroupId?id=${id}`);
}

export function getAllStoriesBlocksByCityId(cityId) {
  return api.get(`Stories/GetAllStoriesBlockByCityId?cityId=${cityId}`);
}

export function createStoriesBlock(values) {
  return api.post('Stories/CreateStoriesBlock', values);
}

export function createStoriesGroup(values) {
  return api.post('Stories/CreateStoriesGroup', values);
}

export function createStoriesItem(values) {
  return api.post('Stories/CreateStoryItem', values);
}

export function updateStoriesBlock(values) {
  return api.post(`Stories/UpdateStoriesBlock?Id=${values.id}`, values);
}

export function updateStoriesGroup(values) {
  return api.post(`${BASE_URL}Stories/UpdateStoriesGroup?Id=${values.id}`, values);
}

export function updateStoriesItem(values) {
  return api.post(`Stories/UpdateStoryItem?Id=${values.id}`, values);
}

export function deleteStoriesBlock(id) {
  return api.delete(`Stories/DeleteStoriesBlock?id=${id}`);
}

export function deleteStoriesGroup(id) {
  return api.delete(`Stories/DeleteStoriesGroup?id=${id}`);
}

export function deleteStoriesItem(id) {
  return api.delete(`Stories/DeleteStoriesItem?id=${id}`);
}
