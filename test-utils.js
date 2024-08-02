import React from 'react';
import { render } from '@testing-library/react';
import { AppRouterContext } from 'next/dist/shared/lib/app-router-context.shared-runtime';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import toastSlice from '@/lib/features/toastSlice';
import { apiSlice } from '@/lib/features/apiSlice';

export const mockRouter = {
  route: '/',
  pathname: '/',
  query: {},
  asPath: '/',
  push: jest.fn(),
  replace: jest.fn(),
  reload: jest.fn(),
  back: jest.fn(),
  prefetch: jest.fn().mockResolvedValue(undefined),
  beforePopState: jest.fn(),
  events: {
    on: jest.fn(),
    off: jest.fn(),
    emit: jest.fn(),
  },
};

const store = configureStore({
  reducer: {
    api: apiSlice.reducer,
    toast: toastSlice,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(apiSlice.middleware),
});

const AllProviders = ({ children }) => {
  return (
    <Provider store={store}>
      <AppRouterContext.Provider value={mockRouter}>{children}</AppRouterContext.Provider>
    </Provider>
  );
};

const customRender = (ui, options) => render(ui, { wrapper: AllProviders, ...options });

// re-export everything
export * from '@testing-library/react';

// override render method
export { customRender as render };
