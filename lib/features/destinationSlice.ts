import { Destination } from '@/types/index';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface DestinationsState {
  destinations: Destination[];
}

const initialState: DestinationsState = {
  destinations: [],
};

const destinationsSlice = createSlice({
  name: 'destinations',
  initialState,
  reducers: {
    addDestination: (state, action: PayloadAction<Destination>) => {
      state.destinations.push(action.payload);
    },
    removeDestination: (state, action: PayloadAction<number>) => {
      state.destinations = state.destinations.filter((destination) => destination.id !== action.payload);
    },
  },
});

export const { addDestination, removeDestination } = destinationsSlice.actions;
export default destinationsSlice.reducer;
