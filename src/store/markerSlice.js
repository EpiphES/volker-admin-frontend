import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import * as api from '../utils/api';

export const fetchAllMarkers = createAsyncThunk(
  'markers/fetchAllMarkers',
  async (values, {rejectWithValue, dispatch}) => {
    try {
      const res = await api.getPaginatedMarkers(values);
      dispatch(setMarkers(res.data))
      dispatch(setTotalPages(res.allPageCount));
      dispatch(setPage(2));
      return res;
    } catch (err) {
      return rejectWithValue(err);
    }
  }
);

export const uploadAllMarkers = createAsyncThunk(
  'markers/uploadAllMarkers',
  async (values, {rejectWithValue, dispatch}) => {
    try {
      const res = await api.getPaginatedMarkers(values);
      dispatch(addMarkers(res.data));
      dispatch(increasePage());
      return res;
    } catch (err) {
      return rejectWithValue(err);
    }
  }
);

export const fetchFilteredMarkers = createAsyncThunk(
  'markers/fetchFilteredMarkers',
  async (values, {rejectWithValue, dispatch}) => {
    try {
      const res = await api.getFilteredPaginatedMarkers(values);
      dispatch(setMarkers(res.data))
      dispatch(setTotalPages(res.allPageCount));
      dispatch(setPage(2));
      return res;
    } catch (err) {
      return rejectWithValue(err);
    }
  }
);

export const uploadFilteredMarkers = createAsyncThunk(
  'markers/uploadFilteredMarkers',
  async (values, {rejectWithValue, dispatch}) => {
    try {
      const res = await api.getFilteredPaginatedMarkers(values);
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
    filterActive: false,
    searchQuery: '', 
    isPublished: 'all',
    mode: '',
    type: '',
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
    setFilters: (state, action) => {
      state.isPublished = action.payload.isPublished;
      state.searchQuery = action.payload.searchQuery;
      state.mode = action.payload.mode;
      state.type = action.payload.type;
    },
    resetFilters: (state) => {
      state.isPublished = 'all';
      state.searchQuery = '';
      state.mode = '';
      state.type = '';
    },
    setFilterActive: (state, action) => {
      state.filterActive = action.payload;
    },
    increasePage: (state ) => {
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
    [fetchAllMarkers.pending]: (state) => { 
      state.fetchMarkersStatus = 'loading';
      state.fetchMarkersError = null;
    },
    [fetchFilteredMarkers.pending]: (state) => { 
      state.fetchMarkersStatus = 'loading';
      state.fetchMarkersError = null;
    },
    [uploadAllMarkers.pending]: (state) => { 
      state.fetchMarkersStatus = 'loading';
      state.fetchMarkersError = null;
    },
    [uploadFilteredMarkers.pending]: (state) => { 
      state.fetchMarkersStatus = 'loading';
      state.fetchMarkersError = null;
    },
    [fetchAllMarkers.fulfilled]: (state) => { 
      state.fetchMarkersStatus = 'resolved';
    },
    [fetchFilteredMarkers.fulfilled]: (state) => { 
      state.fetchMarkersStatus = 'resolved';
    },
    [uploadAllMarkers.fulfilled]: (state) => { 
      state.fetchMarkersStatus = 'resolved';
    },
    [uploadFilteredMarkers.fulfilled]: (state) => { 
      state.fetchMarkersStatus = 'resolved';
    },
    [fetchAllMarkers.rejected]: (state, action) => {
      state.fetchMarkersStatus = 'rejected';
      state.fetchMarkersError = action.payload;
    },
    [fetchFilteredMarkers.rejected]: (state, action) => {
      state.fetchMarkersStatus = 'rejected';
      state.fetchMarkersError = action.payload;
    },
    [uploadAllMarkers.rejected]: (state, action) => {
      state.fetchMarkersStatus = 'rejected';
      state.fetchMarkersError = action.payload;
    },
    [uploadFilteredMarkers.rejected]: (state, action) => {
      state.fetchMarkersStatus = 'rejected';
      state.fetchMarkersError = action.payload;
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
export const { setMarkers, addMarkers, setPage, increasePage, setTotalPages, setFilters, resetFilters, setFilterActive, setCurrentMarker, addMarker, changeMarker, removeMarker } = markerSlice.actions;

export default markerSlice.reducer;