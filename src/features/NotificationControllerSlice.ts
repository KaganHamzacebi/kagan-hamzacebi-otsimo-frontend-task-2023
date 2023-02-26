/**
 * A Redux Slice to handle Notification
 */

import { createSlice } from '@reduxjs/toolkit';
import type { RootState } from '../app/store';
import type { Notification } from '../utils/types';

const initialState: Notification = {
  active: false,
  text: 'An error occurred!',
  type: 'Error'
};

export const notificationControllerSlice = createSlice({
  name: 'notificationSelector',
  initialState,
  reducers: {
    setNotificationActivity: (state, action) => {
      state.active = action.payload;
    },
    setNotificationText: (state, action) => {
      state.text = action.payload;
    },
    setNotificationType: (state, action) => {
      state.text = action.payload;
    }
  }
});

export const {
  setNotificationActivity,
  setNotificationText,
  setNotificationType
} = notificationControllerSlice.actions;
export const getNotification = (state: RootState) => state.notificationController;
export default notificationControllerSlice.reducer;