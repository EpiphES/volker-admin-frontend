import { configureStore } from '@reduxjs/toolkit';

import cityReducer from './citySlice';
import markerReducer from './markerSlice';
import modeReducer from './modeSlice';
import storyReducer from './storySlice';
import userReducer from './userSlice';

const store = configureStore({
  reducer: {
    user: userReducer,
    city: cityReducer,
    mode: modeReducer,
    marker: markerReducer,
    story: storyReducer,
  },
});

export default store;