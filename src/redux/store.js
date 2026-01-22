import { configureStore } from '@reduxjs/toolkit';
import rootreducer from './reducer/rootReducers';

export const store = configureStore({
  reducer: {
    reducer:rootreducer
  },
});
