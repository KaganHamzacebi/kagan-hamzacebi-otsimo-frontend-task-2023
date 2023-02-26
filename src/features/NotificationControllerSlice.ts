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
    // Sets Notification Activity
    setNotificationActivity: (state, action) => {
      state.active = action.payload;
    },
    // Sets Notification Text
    setNotificationText: (state, action) => {
      state.text = action.payload;
    },
    // Sets Notification Type
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