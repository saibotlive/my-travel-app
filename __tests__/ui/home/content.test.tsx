import React from 'react';
import { render, screen, waitFor, fireEvent } from '../../../test-utils';
import HomeContent from '@/app/ui/home/content';
import fetchMock from 'jest-fetch-mock';
import { Destination, Folder } from '@/types/index';

const mockDestinations: Destination[] = [
  { id: 1, name: 'Destination 1', image: '/images/image1.jpg', votes: 10 },
  { id: 2, name: 'Destination 2', image: '/images/image2.jpg', votes: 5 },
];

const mockFolders: Folder[] = [
  { id: 1, name: 'Folder 1', description: 'Description 1', images: [] },
  { id: 2, name: 'Folder 2', description: 'Description 2', images: [] },
];

beforeEach(() => {
  fetchMock.resetMocks();
  fetchMock.mockIf(/^\/api\/.*/, (req) => {
    if (req.url.endsWith('/api/folders')) {
      return Promise.resolve({
        body: JSON.stringify({ folders: mockFolders }),
        headers: { 'Content-Type': 'application/json' },
      });
    } else if (req.url.endsWith('/api/destinations')) {
      return Promise.resolve({
        body: JSON.stringify({ destinations: mockDestinations }),
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
    render(<HomeContent initialDestinations={mockDestinations} initialFolders={mockFolders} />);

    expect(screen.getByText('My Trips')).toBeInTheDocument();

    await waitFor(() => {
      mockFolders.forEach((folder) => {
        expect(screen.getByText(folder.name)).toBeInTheDocument();
      });
    });

    await waitFor(() => {
      mockDestinations.forEach((destination) => {
        expect(screen.getByText(destination.name)).toBeInTheDocument();
      });
    });
  });

  it('handles folder creation', async () => {
    fetchMock.mockResponseOnce(JSON.stringify({ id: '3', name: 'New Folder' }));

    render(<HomeContent initialDestinations={[]} initialFolders={[]} />);

    // Click the button to open the dialog
    fireEvent.click(screen.getByText('Create new trip'));

    // Wait for the dialog to be visible
    await waitFor(() => {
      expect(screen.getByRole('dialog')).toBeInTheDocument();
    });

    // Fill out the form to create a new folder
    fireEvent.change(screen.getByPlaceholderText('E.g. Beach Trip'), { target: { value: 'New Folder' } });
    fireEvent.change(screen.getByPlaceholderText('E.g. Our chill zone dedicated to all things beachy 🏝️'), {
      target: { value: 'New Description' },
    });

    // Click the create button
    fireEvent.click(screen.getByText('Create'));

    // Wait for the new folder to appear in the document
    await waitFor(() => {
      expect(screen.getByText('New Folder')).toBeInTheDocument();
    });
  });
});
