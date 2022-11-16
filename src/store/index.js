import { configureStore } from '@reduxjs/toolkit';

import userReducer from './userSlice';
import cityReducer from './citySlice';
import modeReducer from './modeSlice';
import markerReducer from './markerSlice';

const store = configureStore({
  reducer: {
    user: userReducer,
    city: cityReducer,
    mode: modeReducer,
    marker: markerReducer,
  },
});

export default store;