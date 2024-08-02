// Learn more: https://github.com/testing-library/jest-dom
import '@testing-library/jest-dom';
import { useRouter } from 'next/router';

import fetchMock from 'jest-fetch-mock';
import { mockRouter } from './test-utils';

fetchMock.enableMocks();

jest.mock('next/router', () => ({
  __esModule: true,
  useRouter: jest.fn(),
}));

useRouter.mockImplementation(() => mockRouter);
