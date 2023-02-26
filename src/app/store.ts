import type {
  Action,
  ThunkAction
} from '@reduxjs/toolkit';
import { configureStore } from '@reduxjs/toolkit';

// Reducers
import modalControllerReducer from '../features/ModalControllerSlice';
import notificationControllerSlice from '../features/NotificationControllerSlice';

export const store = configureStore({
  reducer: {
    modalController: modalControllerReducer,
    notificationController: notificationControllerSlice
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware({
    serializableCheck: false
  })
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, RootState, unknown, Action<string>>;