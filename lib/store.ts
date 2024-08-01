import { configureStore } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/query';
import { apiSlice } from '@/lib/features/apiSlice';
import destinationsReducer from '@/lib/features/destinationSlice';
import foldersReducer from '@/lib/features/folderSlice';
import toastReducer from '@/lib/features/toastSlice';

export const store = configureStore({
  reducer: {
    destinations: destinationsReducer,
    folders: foldersReducer,
    toast: toastReducer,
    [apiSlice.reducerPath]: apiSlice.reducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(apiSlice.middleware),
});

setupListeners(store.dispatch);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
