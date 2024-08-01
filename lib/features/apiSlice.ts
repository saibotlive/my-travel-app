import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { Destination, Folder } from '@/types/index';

interface ResponseMessage {
  message: string;
}

interface DestinationsForFolderResponse {
  destinations: Destination[];
  folderName: string;
}

export const apiSlice = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({ baseUrl: '/api' }),
  endpoints: (builder) => ({
    getDestinations: builder.query<Destination[], void>({
      query: () => 'destinations',
      transformResponse: (response: { destinations: { rows: Destination[] } }) => response.destinations.rows,
    }),
    getFolders: builder.query<Folder[], void>({
      query: () => 'folders',
      transformResponse: (response: { folders: Folder[] }) => response.folders,
    }),
    getDestinationsForFolder: builder.query<DestinationsForFolderResponse, number>({
      query: (folderId) => `folders/${folderId}`,
    }),
    upvoteDestination: builder.mutation<void, number>({
      query: (id) => ({
        url: 'upvote',
        method: 'POST',
        body: { id },
      }),
    }),
    createFolder: builder.mutation<Folder, { name: string; description: string }>({
      query: (data) => ({
        url: 'folders',
        method: 'POST',
        body: data,
      }),
    }),
    updateFolderDestinations: builder.mutation<ResponseMessage, { folderId: number; destinationIds: number[] }>({
      query: ({ folderId, destinationIds }) => ({
        url: `folders/${folderId}/destinations`,
        method: 'POST',
        body: { destinationIds },
      }),
    }),
  }),
});

export const {
  useGetDestinationsQuery,
  useGetFoldersQuery,
  useLazyGetFoldersQuery,
  useGetDestinationsForFolderQuery,
  useUpvoteDestinationMutation,
  useCreateFolderMutation,
  useUpdateFolderDestinationsMutation,
} = apiSlice;
