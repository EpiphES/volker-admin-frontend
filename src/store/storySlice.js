import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import * as api from '../utils/api';

export const getStoriesBlocks = createAsyncThunk(
  'stories/getStoriesBlocks',
  async (cityId, {rejectWithValue}) => {
    try {
      const res = await api.getAllStoriesBlocksByCityId(cityId);
      return res;
    } catch (err) {
      return rejectWithValue(err);
    }
  }
);

export const getStoriesBlockById = createAsyncThunk(
  'stories/getStoriesBlockById',
  async (id, {rejectWithValue}) => {
    try {
      const res = await api.getStoriesBlockById(id);
      return res;
    } catch (err) {
      return rejectWithValue(err);
    }
  }
);

export const getStoriesGroupById = createAsyncThunk(
  'stories/getStoriesBlockById',
  async (id, {rejectWithValue}) => {
    try {
      const res = await api.getStoriesGroupById(id);
      return res;
    } catch (err) {
      return rejectWithValue(err);
    }
  }
);

export const createStoriesBlock = createAsyncThunk(
  'stories/createStoriesBlock',
  async (values, {rejectWithValue, dispatch}) => {
    try {
      const res = await api.createStoriesBlock(values);
      dispatch(addStoriesBlock(res));
      return res;
    } catch (err) {
      return rejectWithValue(err);
    }
  }
);

export const updateStoriesBlock = createAsyncThunk(
  'stories/updateStoriesBlock',
  async (values, {rejectWithValue, dispatch}) => {
    try {
      await api.updateStoriesBlock(values);
      dispatch(changeStoriesBlock(values));
      return values;
    } catch (err) {
      return rejectWithValue(err);
    }
  }
);

export const deleteStoriesBlock = createAsyncThunk(
  'stories/deleteStoriesBlock',
  async (id, {rejectWithValue, dispatch}) => {
    try {
      await api.deleteStoriesBlock(id);
      dispatch(removeStoriesBlock({id}));
    } catch (err) {
      return rejectWithValue(err);
    }
  }
);

export const createStoriesGroup = createAsyncThunk(
  'stories/createStoriesGroup',
  async (values, {rejectWithValue, dispatch}) => {
    try {      
      const res = await api.createStoriesGroup(values);
      dispatch(addStoriesGroup(res));
      return res;
    } catch (err) {
      return rejectWithValue(err);
    }
  }
);

export const updateStoriesGroup = createAsyncThunk(
  'stories/updateStoriesGroup',
  async ({values}, {rejectWithValue, dispatch}) => {
    try {
      await api.updateStoriesGroup(values);
      dispatch(changeStoriesGroup(values));       
      return values;
    } catch (err) {
      return rejectWithValue(err);
    }
  }
);

export const deleteStoriesGroup = createAsyncThunk(
  'stories/deleteStoriesGroupe',
  async (values, {rejectWithValue, dispatch}) => {
    try {
      await api.deleteStoriesGroup(values.id);
      dispatch(removeStoriesGroup({id: values.id}));
    } catch (err) {
      return rejectWithValue(err);
    }
  }
);

export const createStoriesItem = createAsyncThunk(
  'stories/createStoriesItem',
  async (values, {rejectWithValue, dispatch}) => {
    try {
      const res = await api.createStoriesItem(values);
      dispatch(addStoriesItem(res));
      return res;
    } catch (err) {
      return rejectWithValue(err);
    }
  }
);

export const updateStoriesItem = createAsyncThunk(
  'stories/updateStoriesItem',
  async ({values}, {rejectWithValue, dispatch}) => {
    try {
      await api.updateStoriesItem(values);
      dispatch(changeStoriesItem(values));
      return values;
    } catch (err) {
      return rejectWithValue(err);
    }
  }
);

export const deleteStoriesItem = createAsyncThunk(
  'stories/deleteStoriesItem',
  async (values, {rejectWithValue, dispatch}) => {
    try {
      await api.deleteStoriesItem(values.id);
      dispatch(removeStoriesItem({id: values.id}));
    } catch (err) {
      return rejectWithValue(err);
    }
  }
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
  },
  reducers: {
    setStoriesBlocks: (state, action) => {
      state.storiesBlocks = action.payload;
    },
    setCurrentStoriesBlock: (state, action) => {
      state.currentStoriesBlock = action.payload ? state.storiesBlocks.find((item) => item.id === action.payload.id) : null;
    },
    addStoriesBlock: (state, action) => {
      state.storiesBlocks.push(action.payload);
    },
    removeStoriesBlock: (state, action) => {
      state.storiesBlocks = state.storiesBlocks.filter(item =>item.id !== +action.payload.id);
      state.currentStoriesBlock = null;
    },
    changeStoriesBlock: (state, action) => {
      state.storiesBlocks = state.storiesBlocks.map((item) => item.id === action.payload.id ? action.payload : item);
      state.currentStoriesBlock = action.payload;       
    },
    addStoriesGroup: (state, action) => {
      state.currentStoriesBlock.storiesGroups.push(action.payload);
      state.currentStoriesGroup = action.payload;
    },
    changeStoriesGroup: (state, action) => {
      state.currentStoriesBlock.storiesGroups = state.currentStoriesBlock.storiesGroups.map((item) => item.id === action.payload.id ? action.payload : item);
      state.currentStoriesGroup = action.payload;
    },
    removeStoriesGroup: (state, action) => {
      state.currentStoriesBlock.storiesGroups = state.currentStoriesBlock.storiesGroups.filter(item => item.id !== action.payload.id);
      state.currentStoriesGroup = null;
    },
    addStoriesItem: (state, action) => {
      state.currentStoriesGroup.storyItems.push(action.payload);
    },
    changeStoriesItem: (state, action) => {
      state.currentStoriesGroup.storyItems = state.currentStoriesGroup.storyItems.map((item) => item.id === action.payload.id ? action.payload : item);
    },
    removeStoriesItem: (state, action) => {
      state.currentStoriesGroup.storyItems = state.currentStoriesGroup.storyItems.filter(item => item.id !== action.payload.id);
    }
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
export const { setStoriesBlocks, setCurrentStoriesBlock, addStoriesBlock, changeStoriesBlock, removeStoriesBlock, addStoriesGroup, changeStoriesGroup, removeStoriesGroup, addStoriesItem, changeStoriesItem, removeStoriesItem } = storySlice.actions;

export default storySlice.reducer;