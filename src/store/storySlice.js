import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import * as api from '../utils/api';
import { getFileNameFromUrl } from '../utils/utils';

export const getStoriesBlocks = createAsyncThunk(
  'stories/getStoriesBlocks',
  async (cityId, { rejectWithValue }) => {
    try {
      const res = await api.getAllStoriesBlocksByCityId(cityId);
      return res;
    } catch (err) {
      return rejectWithValue(err);
    }
  },
);

export const getStoriesBlockById = createAsyncThunk(
  'stories/getStoriesBlockById',
  async (id, { rejectWithValue }) => {
    try {
      const res = await api.getStoriesBlockById(id);
      return res;
    } catch (err) {
      return rejectWithValue(err);
    }
  },
);

export const getStoriesGroupById = createAsyncThunk(
  'stories/getStoriesBlockById',
  async (id, { rejectWithValue }) => {
    try {
      const res = await api.getStoriesGroupById(id);
      return res;
    } catch (err) {
      return rejectWithValue(err);
    }
  },
);

export const createStoriesBlock = createAsyncThunk(
  'stories/createStoriesBlock',
  async (values, { rejectWithValue, dispatch }) => {
    try {
      const res = await api.createStoriesBlock(values);
      dispatch(addStoriesBlock(res.Data));
      return res;
    } catch (err) {
      return rejectWithValue(err);
    }
  },
);

export const updateStoriesBlock = createAsyncThunk(
  'stories/updateStoriesBlock',
  async (values, { rejectWithValue, dispatch }) => {
    try {
      const res = await api.updateStoriesBlock(values);
      dispatch(changeStoriesBlock(res.Data));
      return res;
    } catch (err) {
      return rejectWithValue(err);
    }
  },
);

export const deleteStoriesBlock = createAsyncThunk(
  'stories/deleteStoriesBlock',
  async (id, { rejectWithValue, dispatch }) => {
    try {
      const res = await api.deleteStoriesBlock(id);
      dispatch(removeStoriesBlock(res.Data));
      return res;
    } catch (err) {
      return rejectWithValue(err);
    }
  },
);

export const createStoriesGroup = createAsyncThunk(
  'stories/createStoriesGroup',
  async (values, { rejectWithValue, dispatch }) => {
    try {
      const res = await api.createStoriesGroup(values);
      dispatch(addStoriesGroup(res.Data));
      return res;
    } catch (err) {
      return rejectWithValue(err);
    }
  },
);

export const updateStoriesGroup = createAsyncThunk(
  'stories/updateStoriesGroup',
  async ({ prevImage, ...values }, { rejectWithValue, dispatch }) => {
    try {
      const res = await api.updateStoriesGroup(values);
      dispatch(changeStoriesGroup(res.Data));
      if (prevImage) {
        const prevImageFileName = getFileNameFromUrl(prevImage);
        await api.deleteFile(prevImageFileName);
      }
      return res;
    } catch (err) {
      return rejectWithValue(err);
    }
  },
);

export const deleteStoriesGroup = createAsyncThunk(
  'stories/deleteStoriesGroupe',
  async ({ prevImage, ...values }, { rejectWithValue, dispatch }) => {
    try {
      const res = await api.deleteStoriesGroup(values.id);
      dispatch(removeStoriesGroup(res.Data));
      if (prevImage) {
        const prevImageFileName = getFileNameFromUrl(prevImage);
        await api.deleteFile(prevImageFileName);
      }
      return res;
    } catch (err) {
      return rejectWithValue(err);
    }
  },
);

export const createStoriesItem = createAsyncThunk(
  'stories/createStoriesItem',
  async (values, { rejectWithValue, dispatch }) => {
    try {
      const res = await api.createStoriesItem(values);
      dispatch(addStoriesItem(res.Data));
      return res;
    } catch (err) {
      return rejectWithValue(err);
    }
  },
);

export const updateStoriesItem = createAsyncThunk(
  'stories/updateStoriesItem',
  async ({ prevImage, ...values }, { rejectWithValue, dispatch }) => {
    try {
      const res = await api.updateStoriesItem(values);
      dispatch(changeStoriesItem(res.Data));
      if (prevImage) {
        const prevImageFileName = getFileNameFromUrl(prevImage);
        await api.deleteFile(prevImageFileName);
      }
      return values;
    } catch (err) {
      return rejectWithValue(err);
    }
  },
);

export const deleteStoriesItem = createAsyncThunk(
  'stories/deleteStoriesItem',
  async ({ prevImage, ...values }, { rejectWithValue, dispatch }) => {
    try {
      const res = await api.deleteStoriesItem(values.id);
      dispatch(removeStoriesItem(res.Data));
      if (prevImage) {
        const prevImageFileName = getFileNameFromUrl(prevImage);
        await api.deleteFile(prevImageFileName);
      }
      return res;
    } catch (err) {
      return rejectWithValue(err);
    }
  },
);

const storySlice = createSlice({
  name: 'stories',
  initialState: {
    storiesBlocks: [],
    getStoriesBlocksStatus: null,
    getStoriesBlocksError: null,
    currentStoriesBlock: null,
    currentStoriesBlockStatus: null,
    currentStoriesBlockError: null,
    currentStoriesGroup: null,
    currentStoriesGroupStatus: null,
    currentStoriesGroupError: null,
    createStoriesBlockStatus: null,
    createStoriesBlockError: null,
    updateStoriesBlockStatus: null,
    updateStoriesBlockError: null,
    deleteStoriesBlockStatus: null,
    deleteStoriesBlockError: null,
    createStoriesGroupStatus: null,
    createStoriesGroupError: null,
    updateStoriesGroupStatus: null,
    updateStoriesGroupError: null,
    deleteStoriesGroupStatus: null,
    deleteStoriesGroupError: null,
    currentStoriesItem: null,
    createStoriesItemStatus: null,
    createStoriesItemError: null,
    updateStoriesItemStatus: null,
    updateStoriesItemError: null,
    deleteStoriesItemStatus: null,
    deleteStoriesItemError: null,
  },
  reducers: {
    setStoriesBlocks: (state, action) => {
      state.storiesBlocks = action.payload;
    },
    setCurrentStoriesBlock: (state, action) => {
      state.currentStoriesBlock = action.payload ? state.storiesBlocks
        .find((item) => item.id === action.payload.id) : null;
    },
    setCurrentStoriesGroup: (state, action) => {
      state.currentStoriesGroup = action.payload;
    },
    setCurrentStoriesItem:(state, action) => {
      state.currentStoriesItem = action.payload;
    },
    addStoriesBlock: (state, action) => {
      state.storiesBlocks.push(action.payload);
    },
    removeStoriesBlock: (state, action) => {
      state.storiesBlocks = state.storiesBlocks.filter((item) => item.id !== action.payload);
      state.currentStoriesBlock = null;
    },
    changeStoriesBlock: (state, action) => {
      state.storiesBlocks = state.storiesBlocks.map((item) => (
        item.id === action.payload.id ? action.payload : item
      ));
      state.currentStoriesBlock = action.payload;
    },
    addStoriesGroup: (state, action) => {
      state.storiesBlocks = state.storiesBlocks.map((item) => {
        if (item.id === action.payload.storiesBlockId) {
          item.storiesGroups.push(action.payload);
        }
        return item;
      });
      state.currentStoriesBlock.storiesGroups.push(action.payload);
      state.currentStoriesGroup = action.payload;
    },
    changeStoriesGroup: (state, action) => {
      state.storiesBlocks = state.storiesBlocks.map((item) => {
        if (item.id === action.payload.storiesBlockId) {
          item.storiesGroups = item.storiesGroups.map((group) => (
            group.id === action.payload.id ? action.payload : group
          ));
        }
        return item;
      });
      state.currentStoriesGroup = action.payload;
    },
    removeStoriesGroup: (state, action) => {
      state.storiesBlocks = state.storiesBlocks.map((item) => {
        if(item.id === state.currentStoriesBlock.id) {
          item.storiesGroups = item.storiesGroups.filter((group) => group.id !== action.payload);
        }
        return item;
      });
      state.currentStoriesGroup = null;
    },
    addStoriesItem: (state, action) => {
      state.currentStoriesGroup.storyItems.push(action.payload);
    },
    changeStoriesItem: (state, action) => {
      state.currentStoriesGroup.storyItems = state.currentStoriesGroup.storyItems.map((item) => (
        item.id === action.payload.id ? action.payload : item
      ));
    },
    removeStoriesItem: (state, action) => {
      state.currentStoriesGroup.storyItems = state.currentStoriesGroup.storyItems.filter((item) => (
        item.id !== action.payload
      ));
    },
  },
  extraReducers: {
    [getStoriesBlocks.pending]: (state) => {
      state.getStoriesBlocksStatus = 'loading';
      state.getStoriesBlocksError = null;
    },
    [getStoriesBlocks.fulfilled]: (state, action) => {
      state.getStoriesBlocksStatus = 'resolved';
      state.storiesBlocks = action.payload;
    },
    [getStoriesBlocks.rejected]: (state, action) => {
      state.getStoriesBlocksStatus = 'rejected';
      state.getStoriesBlocksError = action.payload;
    },
    [getStoriesBlockById.pending]: (state) => {
      state.currentStoriesBlockStatus = 'loading';
      state.currentStoriesBlockError = null;
    },
    [getStoriesBlockById.fulfilled]: (state, action) => {
      state.currentStoriesBlockStatus = 'resolved';
      state.currentStoriesBlock = action.payload;
    },
    [getStoriesBlockById.rejected]: (state, action) => {
      state.currentStoriesBlockStatus = 'rejected';
      state.currentStoriesBlockError = action.payload;
    },
    [getStoriesGroupById.pending]: (state) => {
      state.currentStoriesGroupStatus = 'loading';
      state.currentStoriesGroupError = null;
    },
    [getStoriesGroupById.fulfilled]: (state, action) => {
      state.currentStoriesGroupStatus = 'resolved';
      state.currentStoriesGroup = action.payload;
    },
    [getStoriesGroupById.rejected]: (state, action) => {
      state.currentStoriesGroupStatus = 'rejected';
      state.currentStoriesGroupError = action.payload;
    },
    [createStoriesBlock.pending]: (state) => {
      state.createStoriesBlockStatus = 'loading';
      state.createStoriesBlockError = null;
    },
    [createStoriesBlock.fulfilled]: (state) => {
      state.createStoriesBlockStatus = 'resolved';
    },
    [createStoriesBlock.rejected]: (state, action) => {
      state.createStoriesBlockStatus = 'rejected';
      state.createStoriesBlockError = action.payload;
    },
    [updateStoriesBlock.pending]: (state) => {
      state.updateStoriesBlockStatus = 'loading';
      state.updateStoriesBlockError = null;
    },
    [updateStoriesBlock.fulfilled]: (state) => {
      state.updateStoriesBlockStatus = 'resolved';
    },
    [updateStoriesBlock.rejected]: (state, action) => {
      state.updateStoriesBlockStatus = 'rejected';
      state.updateStoriesBlockError = action.payload;
    },
    [deleteStoriesBlock.pending]: (state) => {
      state.deleteStoriesBlockStatus = 'loading';
      state.deleteStoriesBlockError = null;
    },
    [deleteStoriesBlock.fulfilled]: (state) => {
      state.deleteStoriesBlockStatus = 'resolved';
    },
    [deleteStoriesBlock.rejected]: (state, action) => {
      state.deleteStoriesBlockStatus = 'rejected';
      state.deleteStoriesBlockError = action.payload;
    },
    [createStoriesGroup.pending]: (state) => {
      state.createStoriesGroupStatus = 'loading';
      state.createStoriesGroupError = null;
    },
    [createStoriesGroup.fulfilled]: (state) => {
      state.createStoriesGroupStatus = 'resolved';
    },
    [createStoriesGroup.rejected]: (state, action) => {
      state.createStoriesGroupStatus = 'rejected';
      state.createStoriesGroupError = action.payload;
    },
    [updateStoriesGroup.pending]: (state) => {
      state.updateStoriesGroupStatus = 'loading';
      state.updateStoriesGroupError = null;
    },
    [updateStoriesGroup.fulfilled]: (state) => {
      state.updateStoriesGroupStatus = 'resolved';
    },
    [updateStoriesGroup.rejected]: (state, action) => {
      state.updateStoriesGroupStatus = 'rejected';
      state.updateStoriesGroupError = action.payload;
    },
    [deleteStoriesGroup.pending]: (state) => {
      state.deleteStoriesGroupStatus = 'loading';
      state.deleteStoriesGroupError = null;
    },
    [deleteStoriesGroup.fulfilled]: (state) => {
      state.deleteStoriesGroupStatus = 'resolved';
    },
    [deleteStoriesGroup.rejected]: (state, action) => {
      state.deleteStoriesGroupStatus = 'rejected';
      state.deleteStoriesGroupError = action.payload;
    },
    [createStoriesItem.pending]: (state) => {
      state.createStoriesItemStatus = 'loading';
      state.createStoriesItemError = null;
    },
    [createStoriesItem.fulfilled]: (state) => {
      state.createStoriesItemStatus = 'resolved';
    },
    [createStoriesItem.rejected]: (state, action) => {
      state.createStoriesItemStatus = 'rejected';
      state.createStoriesItemError = action.payload;
    },
    [updateStoriesItem.pending]: (state) => {
      state.updateStoriesItemStatus = 'loading';
      state.updateStoriesItemError = null;
    },
    [updateStoriesItem.fulfilled]: (state) => {
      state.updateStoriesItemStatus = 'resolved';
    },
    [updateStoriesItem.rejected]: (state, action) => {
      state.updateStoriesItemStatus = 'rejected';
      state.updateStoriesItemError = action.payload;
    },
    [deleteStoriesItem.pending]: (state) => {
      state.deleteStoriesItemStatus = 'loading';
      state.deleteStoriesItemError = null;
    },
    [deleteStoriesItem.fulfilled]: (state) => {
      state.deleteStoriesItemStatus = 'resolved';
    },
    [deleteStoriesItem.rejected]: (state, action) => {
      state.deleteStoriesItemStatus = 'rejected';
      state.deleteStoriesItemError = action.payload;
    },
  },
});
export const {
  setStoriesBlocks,
  setCurrentStoriesBlock,
  setCurrentStoriesGroup,
  addStoriesBlock,
  changeStoriesBlock,
  removeStoriesBlock,
  addStoriesGroup,
  changeStoriesGroup,
  removeStoriesGroup,
  setCurrentStoriesItem,
  addStoriesItem,
  changeStoriesItem,
  removeStoriesItem,
} = storySlice.actions;

export default storySlice.reducer;
