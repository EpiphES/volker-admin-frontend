import { configureStore } from '@reduxjs/toolkit';

import userReducer from './userSlice';
import cityReducer from './citySlice';
import modeReducer from './modeSlice';

const store = configureStore({
  reducer: {
    user: userReducer,
    city: cityReducer,
    mode: modeReducer,
  },
});

export default store;