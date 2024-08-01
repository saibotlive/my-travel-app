import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface ToastState {
  title: string;
  description: string;
  open: boolean;
}

const initialState: ToastState = {
  title: '',
  description: '',
  open: false,
};

const toastSlice = createSlice({
  name: 'toast',
  initialState,
  reducers: {
    showToast(state, action: PayloadAction<{ title: string; description: string }>) {
      state.title = action.payload.title;
      state.description = action.payload.description;
      state.open = true;
    },
    hideToast(state) {
      state.open = false;
    },
  },
});

export const { showToast, hideToast } = toastSlice.actions;
export default toastSlice.reducer;
