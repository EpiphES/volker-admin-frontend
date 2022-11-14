import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import * as api from '../utils/api';

export const getUserInfo = createAsyncThunk(
  'user/getUserInfo',
  async (token, {rejectWithValue}) => {
    try {
      const res = await api.getUserInfo(token);
      return res;
    } catch (err) {
      return rejectWithValue(err);
    }
  }
);

const userSlice = createSlice({ 
  name: 'user',
  initialState: {
    user: null,
    status: null,
    error: null,
  },
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;
    },
    deleteUser: (state) => {
      state.user = null;
    }
  },
  extraReducers: {
    [getUserInfo.pending]: (state) => { 
      state.status = 'loading';
      state.error = null;
    },
    [getUserInfo.fulfilled]: (state, action) => {
      state.status = 'resolved';
      state.user = action.payload;
    },
    [getUserInfo.rejected]: (state, action) => {
      state.status = 'rejected';
      state.error = action.payload;
    },
  },
});
export const { setUser, deleteUser } = userSlice.actions;

export default userSlice.reducer;