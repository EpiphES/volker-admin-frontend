import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import * as api from '../utils/api';

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
    } catch (err) {
      return rejectWithValue(err);
    }
  }
);

export const updateMarker = createAsyncThunk(
  'markers/updateMarker',
  async (values, {rejectWithValue, dispatch}) => {
    try {
      await api.updateMarker(values);
      dispatch(changeMarker(values));
    } catch (err) {
      return rejectWithValue(err);
    }
  }
);

export const deleteMarker = createAsyncThunk(
  'markers/deleteMarker',
  async (id, {rejectWithValue, dispatch}) => {
    try {
      await api.deleteMarker(id);
      dispatch(removeMarker({id}));
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
          return action.payload;
        }
        return marker;        
      })
      state.currentMarker.title = action.payload.title;
      state.currentMarker.icon = action.payload.icon;
    },
  },
  extraReducers: {
    [getMarkers.pending]: (state) => { 
      state.getMarkersStatus = 'loading';
      state.getMarkersError = null;
    },
    [getMarkers.fulfilled]: (state, action) => {
      state.getMarkersStatus = 'resolved';
      state.markers = action.payload;
    },
    [getMarkers.rejected]: (state, action) => {
      state.getMarkersStatus = 'rejected';
      state.getMarkersError = action.payload;
    },
    [getMarkerById.pending]: (state) => { 
      state.currentMarkerStatus = 'loading';
      state.currentMarkerError = null;
    },
    [getMarkerById.fulfilled]: (state, action) => {
      state.currentMarkerStatus = 'resolved';
      state.currentMarker = action.payload;
    },
    [getMarkerById.rejected]: (state, action) => {
      state.currentMarkerStatus = 'rejected';
      state.currentMarkerError = action.payload;
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
      state.deleteMarkerError = null;
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