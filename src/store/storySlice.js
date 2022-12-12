import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import * as api from '../utils/api';
import { getFileNameFromUrl } from '../utils/utils';

export const getStoriesBlocks = createAsyncThunk(
  'stories/getStoriesBlocks',
  async (_, {rejectWithValue}) => {
    try {
      const res = await api.getAllStoriesBlocksByCityId();
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
  async ({values}, {rejectWithValue, dispatch}) => {
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
  async (values, {rejectWithValue, dispatch}) => {
    try {
      await api.deleteStoriesBlock(values.id);
      dispatch(removeStoriesBlock({id: values.id}));
    } catch (err) {
      return rejectWithValue(err);
    }
  }
);

export const createType = createAsyncThunk(
  'stories/createType',
  async (values, {rejectWithValue, dispatch}) => {
    try {      
      const res = await api.createType(values);
      dispatch(addType(res));
      return res;
    } catch (err) {
      return rejectWithValue(err);
    }
  }
);

export const updateType = createAsyncThunk(
  'stories/updateType',
  async ({prevIcon, ...values}, {rejectWithValue, dispatch}) => {
    try {
      await api.updateType(values);
      dispatch(changeType(values));       
      if(prevIcon) {
        const prevIconFileName = getFileNameFromUrl(prevIcon);
        await api.deleteFile(prevIconFileName);
      };
      return values;
    } catch (err) {
      return rejectWithValue(err);
    }
  }
);

export const deleteType = createAsyncThunk(
  'stories/deleteTypee',
  async (values, {rejectWithValue, dispatch}) => {
    try {
      await api.deleteType(values.id);
      dispatch(removeType({id: values.id}));
      const prevIconFileName = getFileNameFromUrl(values.prevIcon);
      await api.deleteFile(prevIconFileName);
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
    createTypeStatus: null,
    createTypeError: null,
    updateTypeStatus: null,
    updateTypeError: null,    
    deleteTypeStatus: null,
    deleteTypeError: null,
  },
  reducers: {
    setStoriesBlocks: (state, action) => {
      state.storiesBlocks = action.payload;
    },
    setCurrentStoriesBlock: (state, action) => {
      state.currentStoriesBlock = action.payload;
    },
    addStoriesBlock: (state, action) => {
      state.storiesBlocks.pull(action.payload);
    },
    removeStoriesBlock: (state, action) => {
      state.storiesBlocks = state.storiesBlocks.filter(storiesBlock =>storiesBlock.id !== +action.payload.id);
      state.currentStoriesBlock = null;
    },
    changeStoriesBlock: (state, action) => {
      state.storiesBlocks = state.storiesBlocks.map((storiesBlock) => {
        if (storiesBlock.id === +action.payload.id) {
          storiesBlock.title = action.payload.title;
          storiesBlock.icon = action.payload.icon;
          return storiesBlock;
        }
        return storiesBlock;        
      })
      state.currentStoriesBlock.title = action.payload.title;
      state.currentStoriesBlock.icon = action.payload.icon;
    },
    addType: (state, action) => {
      state.currentStoriesBlock.markerTypes.push(action.payload);
    },
    changeType: (state, action) => {
      state.currentStoriesBlock.markerTypes = state.currentStoriesBlock.markerTypes.map((type) => {
        if(type.id === action.payload.id) {
          type.title = action.payload.title;
          type.iconOnMap = action.payload.iconOnMap;
          type.colorOnMap = action.payload.colorOnMap;
          return type;
        }
        return type
      })
    },
    removeType: (state, action) => {
      state.currentStoriesBlock.markerTypes = state.currentStoriesBlock.markerTypes.filter(type => type.id !== action.payload.id)
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
export const { setStoriesBlocks, setCurrentStoriesBlock, addStoriesBlock, changeStoriesBlock, removeStoriesBlock, addType, changeType, removeType } = storySlice.actions;

export default storySlice.reducer;