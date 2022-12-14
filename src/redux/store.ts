import {configureStore} from  '@reduxjs/toolkit';
import counterReducer from './slice/counter-slice'
import contestantReducer from './slice/contestant-slice';

export const store  = configureStore({
  reducer:{
    counter: counterReducer,
    contstant: contestantReducer
  }
});

export type AppDispatch = typeof store.dispatch;
export type RoomState = ReturnType<typeof store.getState>