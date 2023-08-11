import { createSlice } from '@reduxjs/toolkit';

export interface ModalState {
  isOpen: boolean;
  isSignupOpen: boolean;
}

const initialState: ModalState = {
  isOpen: false,
  isSignupOpen: false
};

const modalSlice = createSlice({
  name: 'modal',
  initialState,
  reducers: {
    openModal: (state) => {
      state.isOpen = true;
    },
    closeModal: (state) => {
      state.isOpen = false;
    },
    openSignupModal: (state) => {
      state.isSignupOpen = true;
    },
    closeSignupModal: (state) => {
      state.isSignupOpen = false;
    }
  }
});

export const { openModal, closeModal, openSignupModal, closeSignupModal } = modalSlice.actions;
export default modalSlice.reducer;
