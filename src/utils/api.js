import { BASE_URL, UPLOAD_FOLDER } from "./constants";
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

function checkEmptyResponse(res) {
  return res.ok ? res : Promise.reject(`Ошибка: ${res.status}, ${res.statusText}`);
}

function request(url, options) {
  return fetch(url, options)
  .then(checkResponse)
  .then(checkSuccess);
 }


export function login({ email, password }) {
  return request(`${BASE_URL}Login/Login`, {
    method: 'POST',
    headers: { 
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ email, password })
  });  
}

export function getUserInfo(token) {
  return request(`${BASE_URL}User/GetUserInfo`, {
    method: 'GET',
    headers: {
      'Authorization': `Bearer ${token}`,
    }
  });
}

export function getAllCities(isPublished) {
  return fetch(`${BASE_URL}City/GetAllCities?isPublished=${isPublished}`, {
    method: 'GET',
    headers: {
      'Authorization': `Bearer ${localStorage.getItem('token')}`
    }
  })
  .then(checkResponse);
}

export function getCityById(id) {
  return fetch(`${BASE_URL}City/GetCityById?id=${id}`, {
    method: 'GET',
    headers: {
      'Authorization': `Bearer ${localStorage.getItem('token')}`
    }
  })
  .then(checkResponse);
}

export function createCity({cityName, latitude, longitude, description, modes}) {
  return request(`${BASE_URL}City/Create`, {
    method: 'POST',
    headers: { 
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${localStorage.getItem('token')}`,
    },
    body: JSON.stringify({cityName, latitude, longitude, description, modes})
  })  
}

export function updateCity({id, cityName, latitude, longitude, description, modes}) {
  return fetch(`${BASE_URL}City/Update?id=${id}`, {
    method: 'POST',
    headers: { 
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${localStorage.getItem('token')}`,
    },
    body: JSON.stringify({cityName, latitude, longitude, description, modes})
  })
  .then(checkEmptyResponse); 
}

export function deleteCity(id) {
  return fetch(`${BASE_URL}City/Delete?id=${id}`, {
    method: 'DELETE',
    headers: { 
      'Authorization': `Bearer ${localStorage.getItem('token')}`,
    }
  })
  .then(checkEmptyResponse);  
}

export function removeModeFromCity(cityId, modeId) {
  return fetch(`${BASE_URL}City/RemoveModeFromCity?cityId=${cityId}&modeId=${modeId}`, {
    method: 'DELETE',
    headers: { 
      'Authorization': `Bearer ${localStorage.getItem('token')}`,
    }
  })
  .then(checkEmptyResponse);  
}

export function getAllModes() {
  return fetch(`${BASE_URL}Mode/GetAllMarkerModes`, {
    method: 'GET',
    headers: {
      'Authorization': `Bearer ${localStorage.getItem('token')}`
    }
  })
  .then(checkResponse);
}

export function getModeById(modeId) {
  return fetch(`${BASE_URL}Mode/GetMarkerModeById?modeId=${modeId}`, {
    method: 'GET',
    headers: {
      'Authorization': `Bearer ${localStorage.getItem('token')}`
    }
  })
  .then(checkResponse);
}

export function createMode(values) {
  return request(`${BASE_URL}Mode/CreateMode`, {
    method: 'POST',
    headers: { 
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${localStorage.getItem('token')}`,
    },
    body: JSON.stringify(values)
  });
}

export function updateMode({id, ...values}) {
  return fetch(`${BASE_URL}Mode/UpdateMode?id=${id}`, {
    method: 'POST',
    headers: { 
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${localStorage.getItem('token')}`,
    },
    body: JSON.stringify(values)
  })
  .then(checkEmptyResponse); 
}

export function deleteMode(id) {
  return fetch(`${BASE_URL}Mode/DeleteMode?id=${id}`, {
    method: 'DELETE',
    headers: { 
      'Authorization': `Bearer ${localStorage.getItem('token')}`,
    }
  })
  .then(checkEmptyResponse);  
}

export function createType(values) {
  return request(`${BASE_URL}Mode/CreateType`, {
    method: 'POST',
    headers: { 
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${localStorage.getItem('token')}`,
    },
    body: JSON.stringify(values)
  });
}

export function updateType({id, ...values}) {
  return fetch(`${BASE_URL}Mode/UpdateType?id=${id}`, {
    method: 'POST',
    headers: { 
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${localStorage.getItem('token')}`,
    },
    body: JSON.stringify(values)
  })
  .then(checkEmptyResponse); 
}

export function deleteType(id) {
  return fetch(`${BASE_URL}Mode/DeleteType?id=${id}`, {
    method: 'DELETE',
    headers: { 
      'Authorization': `Bearer ${localStorage.getItem('token')}`,
    }
  })
  .then(checkEmptyResponse);  
}

export function uploadFile(file) {
  const formData = new FormData();
  const newFileName = changeFileName(file.name);  
  formData.append('file', file, newFileName);
  formData.append('folder', UPLOAD_FOLDER);
  return fetch(`${BASE_URL}File/Upload`, {
    method: 'POST',
    headers: { 
      'Authorization': `Bearer ${localStorage.getItem('token')}`,
    },
    body: formData,
  })
  .then(checkResponse);  
}

export function deleteFile(fileName) {
  return fetch(`${BASE_URL}File/Delete?folder=${UPLOAD_FOLDER}&fileName=${fileName}`, {
    method: 'POST',
    headers: { 
      'Authorization': `Bearer ${localStorage.getItem('token')}`,
    },
  })
  .then(checkEmptyResponse); 
}

export function getAllMarkersByCityId(cityId) {
  return fetch(`${BASE_URL}Marker/GetAllMarkersByCityId?cityId=${cityId}`, {
    method: 'GET',
    headers: {
      'Authorization': `Bearer ${localStorage.getItem('token')}`
    }
  })
  .then(checkResponse);
}

export function getMarkerById(id) {
  return fetch(`${BASE_URL}Marker/GetMarkerById?id=${id}`, {
    method: 'GET',
    headers: {
      'Authorization': `Bearer ${localStorage.getItem('token')}`
    }
  })
  .then(checkResponse);
}

export function createMarker(values) {
  return request(`${BASE_URL}Marker/Create`, {
    method: 'POST',
    headers: { 
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${localStorage.getItem('token')}`,
    },
    body: JSON.stringify(values),
  }); 
}

export function updateMarker({id, ...values}) {
  return fetch(`${BASE_URL}Marker/Update?id=${id}`, {
    method: 'POST',
    headers: { 
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${localStorage.getItem('token')}`,
    },
    body: JSON.stringify(values)
  })
  .then(checkEmptyResponse); 
}

export function deleteMarker(id) {
  return fetch(`${BASE_URL}Marker/Delete?id=${id}`, {
    method: 'DELETE',
    headers: { 
      'Authorization': `Bearer ${localStorage.getItem('token')}`,
    }
  })
  .then(checkEmptyResponse);
}

export function getStoriesBlockById(id) {
  return fetch(`${BASE_URL}Stories/GetStoryBlockById?id=${id}`, {
    method: 'GET',
    headers: {
      'Authorization': `Bearer ${localStorage.getItem('token')}`
    }
  })
  .then(checkResponse);
}

export function getStoriesGroupById(id) {
  return fetch(`${BASE_URL}Stories/GetStoriesByGroupId?id=${id}`, {
    method: 'GET',
    headers: {
      'Authorization': `Bearer ${localStorage.getItem('token')}`
    }
  })
  .then(checkResponse);
}

export function getAllStoriesBlocksByCityId(cityId) {
  return fetch(`${BASE_URL}Stories/GetAllStoriesBlockByCityId?cityId=${cityId}`, {
    method: 'GET',
    headers: {
      'Authorization': `Bearer ${localStorage.getItem('token')}`
    }
  })
  .then(checkResponse);
}

export function createStoriesBlock(values) {
  return request(`${BASE_URL}Stories/CreateStoriesBlock`, {
    method: 'POST',
    headers: { 
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${localStorage.getItem('token')}`,
    },
    body: JSON.stringify(values),
  });
}

export function createStoriesGroup(values) {
  return request(`${BASE_URL}Stories/CreateStoriesGroup`, {
    method: 'POST',
    headers: { 
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${localStorage.getItem('token')}`,
    },
    body: JSON.stringify(values),
  });  
}

export function createStoriesItem(values) {
  return request(`${BASE_URL}Stories/CreateStoryItem`, {
    method: 'POST',
    headers: { 
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${localStorage.getItem('token')}`,
    },
    body: JSON.stringify(values),
  });  
}

export function updateStoriesBlock({Id, ...values}) {
  return fetch(`${BASE_URL}Stories/UpdateStoriesBlock?Id=${Id}`, {
    method: 'POST',
    headers: { 
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${localStorage.getItem('token')}`,
    },
    body: JSON.stringify(values)
  })
  .then(checkEmptyResponse); 
}

export function updateStoriesGroup({Id, ...values}) {
  return fetch(`${BASE_URL}Stories/UpdateStoriesGroup?Id=${Id}`, {
    method: 'POST',
    headers: { 
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${localStorage.getItem('token')}`,
    },
    body: JSON.stringify(values)
  })
  .then(checkEmptyResponse); 
}

export function updateStoriesItem({Id, ...values}) {
  return fetch(`${BASE_URL}Stories/UpdateStoryItem?Id=${Id}`, {
    method: 'POST',
    headers: { 
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${localStorage.getItem('token')}`,
    },
    body: JSON.stringify(values)
  })
  .then(checkEmptyResponse); 
}

export function deleteStoriesBlock(id) {
  return fetch(`${BASE_URL}Stories/DeleteStoriesBlock?id=${id}`, {
    method: 'DELETE',
    headers: { 
      'Authorization': `Bearer ${localStorage.getItem('token')}`,
    }
  })
  .then(checkEmptyResponse);
}

export function deleteStoriesGroup(id) {
  return fetch(`${BASE_URL}Stories/DeleteStoriesGroup?id=${id}`, {
    method: 'DELETE',
    headers: { 
      'Authorization': `Bearer ${localStorage.getItem('token')}`,
    }
  })
  .then(checkEmptyResponse);
}

export function deleteStoriesItem(id) {
  return fetch(`${BASE_URL}Stories/DeleteStoriesItem?id=${id}`, {
    method: 'DELETE',
    headers: { 
      'Authorization': `Bearer ${localStorage.getItem('token')}`,
    }
  })
  .then(checkEmptyResponse);
}


