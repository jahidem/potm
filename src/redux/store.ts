import {configureStore} from  '@reduxjs/toolkit';
import contestantReducer from './slice/contestant-slice';
import cfSlice from './slice/afapi-slice'
import contestSlice from './slice/contest-slice';

export const store  = configureStore({
  reducer:{
    contstant: contestantReducer,
    cfapi: cfSlice,
    contest: contestSlice
  }
});

export type AppDispatch = typeof store.dispatch;
export type RoomState = ReturnType<typeof store.getState>