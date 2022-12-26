/* eslint-disable no-param-reassign */
/* eslint-disable no-use-before-define */
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import * as api from '../utils/api';
import { getFileNameFromUrl } from '../utils/utils';

export const getModes = createAsyncThunk(
  'modes/getModes',
  async (_, { rejectWithValue }) => {
    try {
      const res = await api.getAllModes();
      return res;
    } catch (err) {
      return rejectWithValue(err);
    }
  },
);

export const getModeById = createAsyncThunk(
  'modes/getModeById',
  async (modeId, { rejectWithValue }) => {
    try {
      const res = await api.getModeById(modeId);
      return res;
    } catch (err) {
      return rejectWithValue(err);
    }
  },
);

export const createMode = createAsyncThunk(
  'modes/createMode',
  async (values, { rejectWithValue, dispatch }) => {
    try {
      const res = await api.createMode(values);
      dispatch(addMode(res.data));
      return res;
    } catch (err) {
      return rejectWithValue(err);
    }
  },
);

export const updateMode = createAsyncThunk(
  'modes/updateMode',
  async ({ prevIcon, ...values }, { rejectWithValue, dispatch }) => {
    try {
      const res = await api.updateMode(values);
      dispatch(changeMode(res.data));
      if (prevIcon) {
        const prevIconFileName = getFileNameFromUrl(prevIcon);
        await api.deleteFile(prevIconFileName);
      }
      return res;
    } catch (err) {
      return rejectWithValue(err);
    }
  },
);

export const deleteMode = createAsyncThunk(
  'modes/deleteMode',
  async ({ prevIcon, ...values }, { rejectWithValue, dispatch }) => {
    try {
      const res = await api.deleteMode(values.id);
      dispatch(removeMode(res.data));
      if (prevIcon) {
        const prevIconFileName = getFileNameFromUrl(prevIcon);
        await api.deleteFile(prevIconFileName);
      }
      return res;
    } catch (err) {
      return rejectWithValue(err);
    }
  },
);

export const createType = createAsyncThunk(
  'modes/createType',
  async (values, { rejectWithValue, dispatch }) => {
    try {
      const res = await api.createType(values);
      dispatch(addType(res.data));
      return res;
    } catch (err) {
      return rejectWithValue(err);
    }
  },
);

export const updateType = createAsyncThunk(
  'modes/updateType',
  async ({ prevIcon, ...values }, { rejectWithValue, dispatch }) => {
    try {
      const res = await api.updateType(values);
      dispatch(changeType(res.data));
      if (prevIcon) {
        const prevIconFileName = getFileNameFromUrl(prevIcon);
        await api.deleteFile(prevIconFileName);
      }
      return res;
    } catch (err) {
      return rejectWithValue(err);
    }
  },
);

export const deleteType = createAsyncThunk(
  'modes/deleteTypee',
  async ({ prevIcon, ...values }, { rejectWithValue, dispatch }) => {
    try {
      const res = await api.deleteType(values.id);
      dispatch(removeType(res.data));
      if (prevIcon) {
        const prevIconFileName = getFileNameFromUrl(prevIcon);
        await api.deleteFile(prevIconFileName);
      }
      return res;
    } catch (err) {
      return rejectWithValue(err);
    }
  },
);

const modeSlice = createSlice({
  name: 'modes',
  initialState: {
    modes: [],
    currentMode: null,
    currentModeStatus: null,
    currentModeError: null,
    getModesStatus: null,
    getModesError: null,
    updateModeStatus: null,
    updateModeError: null,
    createModeStatus: null,
    createModeError: null,
    deleteModeStatus: null,
    deleteModeError: null,
    updateTypeStatus: null,
    updateTypeError: null,
    createTypeStatus: null,
    createTypeError: null,
    deleteTypeStatus: null,
    deleteTypeError: null,
  },
  reducers: {
    setModes: (state, action) => {
      state.modes = action.payload;
    },
    setCurrentMode: (state, action) => {
      state.currentMode = action.payload;
    },
    addMode: (state, action) => {
      state.modes.unshift(action.payload);
    },
    removeMode: (state, action) => {
      state.modes = state.modes.filter((mode) => mode.id !== action.payload);
      state.currentMode = null;
    },
    changeMode: (state, action) => {
      state.modes = state.modes.map((mode) => (
        mode.id === action.payload.id ? action.payload : mode));
      state.currentMode = action.payload;
    },
    addType: (state, action) => {
      state.currentMode.markerTypes.push(action.payload);
    },
    changeType: (state, action) => {
      state.currentMode.markerTypes = state.currentMode.markerTypes.map((type) => (
        type.id === action.payload.id ? action.payload : type));
    },
    removeType: (state, action) => {
      state.currentMode.markerTypes = state.currentMode.markerTypes.filter((type) => (
        type.id !== action.payload));
    },
  },
  extraReducers: {
    [getModes.pending]: (state) => {
      state.getModesStatus = 'loading';
      state.getModesError = null;
    },
    [getModes.fulfilled]: (state, action) => {
      state.getModesStatus = 'resolved';
      state.modes = action.payload;
    },
    [getModes.rejected]: (state, action) => {
      state.getModesStatus = 'rejected';
      state.getModesError = action.payload;
    },
    [getModeById.pending]: (state) => {
      state.currentModeStatus = 'loading';
      state.currentModeError = null;
    },
    [getModeById.fulfilled]: (state, action) => {
      state.currentModeStatus = 'resolved';
      state.currentMode = action.payload;
    },
    [getModeById.rejected]: (state, action) => {
      state.currentModeStatus = 'rejected';
      state.currentModeError = action.payload;
    },
    [createMode.pending]: (state) => {
      state.createModeStatus = 'loading';
      state.createModeError = null;
    },
    [createMode.fulfilled]: (state) => {
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
    [updateMode.fulfilled]: (state) => {
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
    [createType.pending]: (state) => {
      state.createTypeStatus = 'loading';
      state.createTypeError = null;
    },
    [createType.fulfilled]: (state) => {
      state.createTypeStatus = 'resolved';
    },
    [createType.rejected]: (state, action) => {
      state.createTypeStatus = 'rejected';
      state.createTypeError = action.payload;
    },
    [updateType.pending]: (state) => {
      state.updateTypeStatus = 'loading';
      state.updateTypeError = null;
    },
    [updateType.fulfilled]: (state) => {
      state.updateTypeStatus = 'resolved';
    },
    [updateType.rejected]: (state, action) => {
      state.updateTypeStatus = 'rejected';
      state.updateTypeError = action.payload;
    },
    [deleteType.pending]: (state) => {
      state.deleteTypeStatus = 'loading';
      state.deleteTypeError = null;
    },
    [deleteType.fulfilled]: (state) => {
      state.deleteTypeStatus = 'resolved';
    },
    [deleteType.rejected]: (state, action) => {
      state.deleteTypeStatus = 'rejected';
      state.deleteTypeError = action.payload;
    },
  },
});
export const {
  setModes,
  setCurrentMode,
  addMode,
  changeMode,
  removeMode,
  addType,
  changeType,
  removeType,
} = modeSlice.actions;

export default modeSlice.reducer;
