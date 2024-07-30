import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { Destination } from './destinationSlice';

export const apiSlice = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({ baseUrl: '/api' }),
  endpoints: (builder) => ({
    getDestinations: builder.query<Destination[], void>({
      query: () => '/destinations',
    }),
    upvoteDestination: builder.mutation<void, number>({
      query: (id) => ({
        url: '/upvote',
        method: 'POST',
        body: { id },
      }),
    }),
    createFolder: builder.mutation<any, string>({
      query: (name) => ({
        url: '/folders',
        method: 'POST',
        body: { name },
      }),
    }),
    updateFolderDestinations: builder.mutation<void, { folderId: number; destinationIds: number[] }>({
      query: ({ folderId, destinationIds }) => ({
        url: `/folders/${folderId}`,
        method: 'POST',
        body: { destinationIds },
      }),
    }),
  }),
});

export const {
  useGetDestinationsQuery,
  useUpvoteDestinationMutation,
  useCreateFolderMutation,
  useUpdateFolderDestinationsMutation,
} = apiSlice;
