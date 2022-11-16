import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import * as api from '../utils/api';
import { getFileNameFromUrl } from "../utils/utils";

export const getMarkers = createAsyncThunk(
  'markers/getMarkers',
  async (cityId, {rejectWithValue}) => {
    try {
      const res = await api.getAllMarkersByCityId (cityId);
      return res;
    } catch (err) {
      return rejectWithValue(err);
    }
  }
);

export const getMarkerById = createAsyncThunk(
  'markers/getMarkerById',
  async (id, {rejectWithValue}) => {
    try {
      const res = await api.getMarkerById(id);
      return res;
    } catch (err) {
      return rejectWithValue(err);
    }
  }
);

export const createMarker = createAsyncThunk(
  'markers/createMarker',
  async (values, {rejectWithValue, dispatch}) => {
    try {
      const res = await api.createMarker(values);
      dispatch(addMarker(res));
      return res;
    } catch (err) {
      return rejectWithValue(err);
    }
  }
);

export const updateMarker = createAsyncThunk(
  'markers/updateMarker',
  async (values, {rejectWithValue, dispatch}) => {
    try {
      await api.updateMarker({id: values.id, title: values.title, icon: values.icon});
      dispatch(changeMarker({id: values.id, title: values.title, icon: values.icon}));
      if(values.prevIcon) {
        const prevIconFileName = getFileNameFromUrl(values.prevIcon);
        await api.deleteFile(prevIconFileName);
      }
      return values;
    } catch (err) {
      return rejectWithValue(err);
    }
  }
);

export const deleteMarker = createAsyncThunk(
  'markers/deleteMarker',
  async (values, {rejectWithValue, dispatch}) => {
    try {
      await api.deleteMarker(values.id);
      dispatch(removeMarker({id: values.id}));
      const prevIconFileName = getFileNameFromUrl(values.prevIcon);
      await api.deleteFile(prevIconFileName);
    } catch (err) {
      return rejectWithValue(err);
    }
  }
);

const markerSlice = createSlice({ 
  name: 'markers',
  initialState: {
    markers: [],
    currentMarker: null,
    currentMarkerStatus: null,
    currentMarkerError: null,
    getMarkersStatus: null,
    getMarkersError: null,
    updateMarkerStatus: null,
    updateMarkerError: null,
    createMarkerStatus: null,
    createMarkerError: null,
    deleteMarkerStatus: null,
    deleteMarkerError: null,
  },
  reducers: {
    setMarkers: (state, action) => {
      state.markers = action.payload;
    },
    setCurrentMarker: (state, action) => {
      state.currentMarker = action.payload;
    },
    addMarker: (state, action) => {
      state.markers.unshift(action.payload);
    },
    removeMarker: (state, action) => {
      state.markers = state.markers.filter((marker) => marker.id !== +action.payload.id);
      state.currentMarker = null;
    },
    changeMarker: (state, action) => {
      state.markers = state.markers.map((marker) => {
        if (marker.id === +action.payload.id) {
          marker.title = action.payload.title;
          marker.icon = action.payload.icon;
          return marker;
        }
        return marker;        
      })
      state.currentMarker.title = action.payload.title;
      state.currentMarker.icon = action.payload.icon;
    },
  },
  extraReducers: {
    [getMarkers.pending]: (state) => { 
      state.getModesStatus = 'loading';
      state.getModesError = null;
    },
    [getMarkers.fulfilled]: (state, action) => {
      state.getModesStatus = 'resolved';
      state.modes = action.payload;
    },
    [getMarkers.rejected]: (state, action) => {
      state.getModesStatus = 'rejected';
      state.getModesError = action.payload;
    },
    [getMarkerById.pending]: (state) => { 
      state.currentModeStatus = 'loading';
      state.currentModeError = null;
    },
    [getMarkerById.fulfilled]: (state, action) => {
      state.currentModeStatus = 'resolved';
      state.currentMode = action.payload;
    },
    [getMarkerById.rejected]: (state, action) => {
      state.currentModeStatus = 'rejected';
      state.currentModeError = action.payload;
    },
    [createMarker.pending]: (state) => { 
      state.createMarkerStatus = 'loading';
      state.createMarkerError = null;
    },
    [createMarker.fulfilled]: (state) => {
      state.createMarkerStatus = 'resolved';
    },
    [createMarker.rejected]: (state, action) => {
      state.createMarkerStatus = 'rejected';
      state.createMarkerError = action.payload;
    },
    [updateMarker.pending]: (state) => { 
      state.updateMarkerStatus = 'loading';
      state.updateMarkerError = null;
    },
    [updateMarker.fulfilled]: (state) => {
      state.updateMarkerStatus = 'resolved';
    },
    [updateMarker.rejected]: (state, action) => {
      state.updateMarkerStatus = 'rejected';
      state.updateMarkerError = action.payload;
    },    
    [deleteMarker.pending]: (state) => { 
      state.deleteMarkerStatus = 'loading';
      state.deleteModeError = null;
    },    
    [deleteMarker.fulfilled]: (state) => {
      state.deleteMarkerStatus = 'resolved';
    },
    [deleteMarker.rejected]: (state, action) => {
      state.deleteMarkerStatus = 'rejected';
      state.deleteMarkerError = action.payload;
    },
  },
});
export const { setMarkers, setCurrentMarker, addMarker, changeMarker, removeMarker } = markerSlice.actions;

export default markerSlice.reducer;