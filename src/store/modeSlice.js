import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import * as api from '../utils/api';

export const fetchModes = createAsyncThunk(
  'modes/fetchModes',
  async (_, {rejectWithValue}) => {
    try {
      const res = await api.getAllModes();
      return res;
    } catch (err) {
      return rejectWithValue(err);
    }
  }
);

const modeSlice = createSlice({ 
  name: 'modes',
  initialState: {
    modes: [],
    status: null,
    error: null,
  },
  reducers: {
    setModes: (state, action) => {
      state.modes = action.payload;
    },
    
  },
  extraReducers: {
    [fetchModes.fulfilled]: (state, action) => {
      state.modes = action.payload;
    },    
  },
});
export const { setModes } = modeSlice.actions;

export default modeSlice.reducer;