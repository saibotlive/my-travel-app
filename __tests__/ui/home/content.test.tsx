import React from 'react';
import { render, screen, waitFor, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import HomeContent from '@/app/ui/home/content';
import { apiSlice } from '@/lib/features/apiSlice';
import toastSlice from '@/lib/features/toastSlice';
import fetchMock from 'jest-fetch-mock';

fetchMock.enableMocks();

// Mock data
const mockDestinations = [
  { id: 1, name: 'Destination 1', image: '/images/image1.jpg', votes: 10 },
  { id: 2, name: 'Destination 2', image: '/images/image2.jpg', votes: 5 },
];

const mockFolders = [
  { id: 1, name: 'Folder 1', description: 'Description 1', images: [] },
  { id: 2, name: 'Folder 2', description: 'Description 2', images: [] },
];

// Configure the store
const store = configureStore({
  reducer: {
    api: apiSlice.reducer,
    toast: toastSlice,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(apiSlice.middleware),
});

beforeEach(() => {
  fetchMock.resetMocks();
  fetchMock.mockIf(/^\/api\/.*/, (req) => {
    if (req.url.endsWith('/api/folders')) {
      return Promise.resolve({
        body: JSON.stringify(mockFolders),
        headers: { 'Content-Type': 'application/json' },
      });
    } else if (req.url.endsWith('/api/destinations')) {
      return Promise.resolve({
        body: JSON.stringify({ rows: mockDestinations }),
        headers: { 'Content-Type': 'application/json' },
      });
    }
    return Promise.resolve({
      status: 404,
      body: 'Not Found',
    });
  });
});

describe('HomeContent', () => {
  it('renders the component and displays initial data', async () => {
    render(
      <Provider store={store}>
        <HomeContent initialDestinations={mockDestinations} initialFolders={mockFolders} />
      </Provider>
    );

    // Check if the heading is rendered
    expect(screen.getByText('My Trips')).toBeInTheDocument();

    // Check if the folders are rendered
    await waitFor(() => {
      mockFolders.forEach((folder) => {
        expect(screen.getByText(folder.name)).toBeInTheDocument();
      });
    });

    // Check if the destinations are rendered
    await waitFor(() => {
      mockDestinations.forEach((destination) => {
        expect(screen.getByText(destination.name)).toBeInTheDocument();
      });
    });
  });
});
