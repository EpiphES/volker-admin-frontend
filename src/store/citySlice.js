import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import * as api from '../utils/api';

export const getCities = createAsyncThunk(
  'cities/getCities',
  async (isPublished, {rejectWithValue}) => {
    try {
      const res = await api.getAllCities(isPublished);
      return res;
    } catch (err) {
      return rejectWithValue(err);
    }
  }
);

export const getCurrentCity = createAsyncThunk(
  'cities/getCurrentCity',
  async (id, {rejectWithValue}) => {
    try {
      const res = await api.getCityById(id);
      return res;
    } catch (err) {
      return rejectWithValue(err);
    }
  }
);

export const createCity = createAsyncThunk(
  'cities/createCity',
  async (values, {rejectWithValue, dispatch}) => {
    try {
      const res = await api.createCity(values);
      dispatch(addCity(res));
    } catch (err) {
      return rejectWithValue(err);
    }
  }
);

export const updateCity = createAsyncThunk(
  'cities/updateCity',
  async (values, {rejectWithValue, dispatch}) => {
    try {
      await api.updateCity(values);
      dispatch(changeCity(values));
    } catch (err) {
      return rejectWithValue(err);
    }
  }
);

export const deleteCity = createAsyncThunk(
  'cities/deleteCity',
  async (id, {rejectWithValue, dispatch}) => {
    try {
      await api.deleteCity(id);
      dispatch(removeCity({id}));
    } catch (err) {
      return rejectWithValue(err);
    }
  }
);


const citySlice = createSlice({ 
  name: 'cities',
  initialState: {
    cities: [],
    currentCity: null,
    currentCityStatus: null,
    currentCityError: null,
    updateCityStatus: null,
    updateCityError: null,
    createCityStatus: null,
    createCityError: null,
  },
  reducers: {
    setCities: (state, action) => {
      state.cities = action.payload;
    },
    addCity: (state, action) => {
      state.cities.push(action.payload);
    },
    removeCity: (state, action) => {
      state.cities = state.cities.filter(city => city.id !== action.payload.id);
    },
    changeCity: (state, action) => {
      state.cities = state.cities.map(city => city.id === action.payload.id ? action.payload : city )
    },
  },
  extraReducers: {
    [getCities.fulfilled]: (state, action) => {
      state.cities = action.payload;
    },
    [getCurrentCity.pending]: (state) => { 
      state.currentCityStatus = 'loading';
      state.currentCityError = null;
    },
    [getCurrentCity.fulfilled]: (state, action) => {
      state.currentCityStatus = 'resolved';
      state.currentCity = action.payload;
    },
    [getCurrentCity.rejected]: (state, action) => {
      state.currentCityStatus = 'rejected';
      state.currentCityError = action.payload;
    },    
    [deleteCity.fulfilled]: (state, action) => {
      state.currentCity = null;
    }
  },
});
export const { setCities, addCity, changeCity, removeCity } = citySlice.actions;

export default citySlice.reducer;