import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import * as api from '../utils/api';

export const getModes = createAsyncThunk(
  'modes/getModes',
  async (_, {rejectWithValue}) => {
    try {
      const res = await api.getAllModes();
      return res;
    } catch (err) {
      return rejectWithValue(err);
    }
  }
);

export const getModeById = createAsyncThunk(
  'mode/getModeById',
  async (modeId, {rejectWithValue}) => {
    try {
      const res = await api.getModeById(modeId);
      return res;
    } catch (err) {
      return rejectWithValue(err);
    }
  }
);

export const createMode = createAsyncThunk(
  'modes/createMode',
  async (values, {rejectWithValue, dispatch}) => {
    try {
      const res = await api.createMode(values);
      dispatch(addMode(res));
      return res;
    } catch (err) {
      return rejectWithValue(err);
    }
  }
);

export const updateMode = createAsyncThunk(
  'modes/updateMode',
  async (values, {rejectWithValue, dispatch}) => {
    try {
      await api.updateMode(values);
      dispatch(changeMode(values));
      return values;
    } catch (err) {
      return rejectWithValue(err);
    }
  }
);

export const deleteMode = createAsyncThunk(
  'modes/deleteMode',
  async (id, {rejectWithValue, dispatch}) => {
    try {
      await api.deleteMode(id);
      dispatch(removeMode({id}));
    } catch (err) {
      return rejectWithValue(err);
    }
  }
);

const modeSlice = createSlice({ 
  name: 'modes',
  initialState: {
    modes: [],
    updateModeStatus: null,
    updateModeError: null,
    createModeStatus: null,
    createModeError: null,
    deleteModeStatus: null,
    deleteModeError: null,
  },
  reducers: {
    setModes: (state, action) => {
      state.modes = action.payload;
    },
    addMode: (state, action) => {
      state.modes.push(action.payload);
    },
    removeMode: (state, action) => {
      state.modes = state.modes.filter(mode => mode.id !== action.payload.id);
    },
    changeMode: (state, action) => {
      state.modes = state.modes.map(mode => mode.id === action.payload.id ? action.payload : mode)
    },    
  },
  extraReducers: {
    [getModes.fulfilled]: (state, action) => {
      state.modes = action.payload;
    },
    [createMode.pending]: (state) => { 
      state.createModeStatus = 'loading';
      state.createModeError = null;
    },
    [createMode.fulfilled]: (state, action) => {
      state.createModeStatus = 'resolved';
    },
    [createMode.rejected]: (state, action) => {
      state.createModeStatus = 'rejected';
      state.createModeError = action.payload;
    },
    [updateMode.pending]: (state) => { 
      state.updateModeStatus = 'loading';
      state.updateModeError = null;
    },
    [updateMode.fulfilled]: (state, action) => {
      state.updateModeStatus = 'resolved';
    },
    [updateMode.rejected]: (state, action) => {
      state.updateModeStatus = 'rejected';
      state.updateModeError = action.payload;
    },    
    [deleteMode.pending]: (state) => { 
      state.deleteModeStatus = 'loading';
      state.deleteModeError = null;
    },    
    [deleteMode.fulfilled]: (state) => {
      state.deleteModeStatus = 'resolved';
    },
    [deleteMode.rejected]: (state, action) => {
      state.deleteModeStatus = 'rejected';
      state.deleteModeError = action.payload;
    },    
  },
});
export const { setModes, addMode, changeMode, removeMode } = modeSlice.actions;

export default modeSlice.reducer;