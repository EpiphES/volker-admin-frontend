import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import * as api from '../utils/api';

export const fetchMarkers = createAsyncThunk(
  'markers/fetchMarkers',
  async (values, {rejectWithValue, dispatch}) => {
    try {
      const res = await api.GetMarkers(values);
      dispatch(setMarkers(res.data))
      dispatch(setTotalPages(res.allPageCount));
      dispatch(setPage(2));
      return res;
    } catch (err) {
      return rejectWithValue(err);
    }
  }
);

export const uploadMarkers = createAsyncThunk(
  'markers/uploadMarkers',
  async (values, {rejectWithValue, dispatch}) => {
    try {
      const res = await api.GetMarkers(values);
      dispatch(addMarkers(res.data));
      dispatch(increasePage());
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
      dispatch(addMarker(res.Data));
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
      const res = await api.updateMarker(values);
      dispatch(changeMarker(res.Data));
      return res;
    } catch (err) {
      return rejectWithValue(err);
    }
  }
);

export const deleteMarker = createAsyncThunk(
  'markers/deleteMarker',
  async (id, {rejectWithValue, dispatch}) => {
    try {
      const res = await api.deleteMarker(id);
      dispatch(removeMarker(res.Data));
      return res;
    } catch (err) {
      return rejectWithValue(err);
    }
  }
);

const markerSlice = createSlice({ 
  name: 'markers',
  initialState: {
    markers: [],
    page: 1,
    totalPages: 0,
    searchQuery: '', 
    isPublished: 'all',
    mode: null,
    type: null,
    currentMarker: null,
    currentMarkerStatus: null,
    currentMarkerError: null,
    fetchMarkersStatus: null,
    fetchMarkersError: null,
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
    addMarkers: (state, action) => {
      state.markers = [...state.markers, ...action.payload];
    },
    setPage: (state, action) => {
      state.page = action.payload;
    },
    increasePage: (state,action) => {
      state.page = state.page + 1;
    },
    setTotalPages: ((state, action) => {
      state.totalPages = action.payload;
    }),
    setCurrentMarker: (state, action) => {
      state.currentMarker = action.payload;
    },
    addMarker: (state, action) => {
      state.markers.unshift(action.payload);
    },
    removeMarker: (state, action) => {
      state.markers = state.markers.filter((marker) => marker.id !== action.payload);
      state.currentMarker = null;
    },
    changeMarker: (state, action) => {
      state.markers = state.markers.map((marker) => marker.id === action.payload.id ? action.payload : marker);
      state.currentMarker = action.payload;
    },
  },
  extraReducers: {
    [fetchMarkers.pending]: (state) => { 
      state.fetchMarkersStatus = 'loading';
      state.fetchMarkersError = null;
    },
    [fetchMarkers.fulfilled]: (state, action) => { 
      state.fetchMarkersStatus = 'resolved';
    },
    [fetchMarkers.rejected]: (state, action) => {
      state.fetchMarkersStatus = 'rejected';
      state.fetchMarkersError = action.payload;
    },
    [uploadMarkers.pending]: (state) => { 
      state.uploadMarkersStatus = 'loading';
      state.uploadMarkersError = null;
    },
    [uploadMarkers.fulfilled]: (state, action) => { 
      state.uploadMarkersStatus = 'resolved';
    },
    [uploadMarkers.rejected]: (state, action) => {
      state.uploadMarkersStatus = 'rejected';
      state.uploadMarkersError = action.payload;
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
export const { setMarkers, addMarkers, setPage, increasePage, setTotalPages, setCurrentMarker, addMarker, changeMarker, removeMarker } = markerSlice.actions;

export default markerSlice.reducer;