import { configureStore } from '@reduxjs/toolkit';
import { authReducer } from '../reducers/authReducer';
import { eventReducer } from '../reducers/eventReducer';
import { logReducer } from '../reducers/logReducer';
import { reservationReducer } from '../reducers/reservationReducer';
import { searchReducer } from '../reducers/searchReducer';
import { uiReducer } from '../reducers/uiReducer';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    ui: uiReducer,
    reservations: reservationReducer,
    events: eventReducer,
    logs: logReducer,
    search: searchReducer,
  },
});
