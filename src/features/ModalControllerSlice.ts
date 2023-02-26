/**
 * A Redux Slice to handle Modal Activity
 */

import { createSlice } from '@reduxjs/toolkit';
import type { RootState } from '../app/store';
import type { Meal } from '../utils/types';

const initialState: { active: boolean, props: Meal | undefined } = {
  active: false,
  props: undefined
};

export const modalControllerSlice = createSlice({
  name: 'modalSelector',
  initialState,
  reducers: {
    setModalActivity: (state, action) => {
      state.active = action.payload;
    },
    setModalProps: (state, action) => {
      state.props = action.payload;
    }
  }
});

export const {
  setModalActivity,
  setModalProps
} = modalControllerSlice.actions;
export const getModal = (state: RootState) => state.modalController;
export default modalControllerSlice.reducer;