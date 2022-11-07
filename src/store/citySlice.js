import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import * as api from '../utils/api';

export const fetchCities = createAsyncThunk(
  'cities/fetchCities',
  async (isPublished, {rejectWithValue}) => {
    try {
      const res = await api.getAllCities(isPublished);
      return res;
    } catch (err) {
      return rejectWithValue(err);
    }
  }
);

export const fetchCurrentCity = createAsyncThunk(
  'cities/fetchCurrentCity',
  async (id, {rejectWithValue}) => {
    try {
      const res = await api.getCityById(id);
      return res;
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
    status: null,
    error: null,
  },
  reducers: {
    setCities: (state, action) => {
      state.cities = action.payload;
    },
    addCity: (state, action) => {
      state.cities.push(action.paiload);
    },
    removeCity: (state, action) => {
      state.cities = state.cities.filter(city => city.id !== action.payload.id);
    },
    updateCity: (state, action) => {
      state.cities = state.cities.map(city => city.id === action.payload.id ? action.payload : city )
    },
  },
  extraReducers: {
    [fetchCities.fulfilled]: (state, action) => {
      state.cities = action.payload;
    },
    [fetchCurrentCity.fulfilled]: (state, action) => {
      state.currentCity = action.payload;
    }
  },
});
export const { setCities } = citySlice.actions;

export default citySlice.reducer;