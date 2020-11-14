import Home from '../../components/Home';
import * as React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import { listings } from '../utils/testUtils';
import ErrorBoundary from '../../components/ErrorBoundary';
import { BrowserRouter as Router } from 'react-router-dom';
import '@testing-library/jest-dom/extend-expect';

const jobListingService = require('../../services/jobListingService');

describe('Home snapshot test', () => {
  test('renders', () => {
    jobListingService.getJobListing = jest.fn(() => Promise.resolve(listings));
    const { container } = render(<Home />);
    expect(container).toMatchSnapshot();
  });
});

describe('Home render test', () => {
  test('renders Home', () => {
    jobListingService.getJobListing = jest.fn(() => Promise.resolve(listings));
    render(<Home />);
    expect(screen.getByText('Loading...')).toBeInTheDocument();
    expect(
      screen.getByText('Please wait for job listings to be updated')
    ).toBeInTheDocument();
  });
});

describe('Home get results test', () => {
  test('get success results from Listing Service', async () => {
    jobListingService.getJobListing = jest.fn(() => Promise.resolve(listings));
    render(
      <Router>
        <Home />
      </Router>
    );
    await waitFor(() => {
      screen.getByText('Type');
      screen.getByText('Title');
      screen.getByText('Location');
      screen.getByText('Full Time');
      screen.getByText('Full Stack Engineer');
      screen.getByText('New York City');
      screen.getByPlaceholderText('Filter by job-location');
    });
  });

  test('get error results from Listing Service', async () => {
    let errorListings = listings;
    errorListings.error = true;
    errorListings.errorMsg = 'Dummy error message';
    jobListingService.getJobListing = jest.fn(() =>
      Promise.resolve(errorListings)
    );
    render(<Home />);
    await waitFor(() => {
      screen.getByText('No listing found');
    });
    screen.getByText('Dummy error message');
  });

  test('Reject from Listing Service', async () => {
    jobListingService.getJobListing = jest.fn(() =>
      Promise.reject('DUMMY error')
    );
    render(
      <ErrorBoundary>
        <Home />
      </ErrorBoundary>
    );
    await waitFor(() => {
      screen.getByText('Error!');
      screen.getByText('DUMMY error');
      screen.getByText(/Please click/i);
      screen.debug();
    });
  });

  test('Exception from Listing Service', async () => {
    jobListingService.getJobListing = jest.fn(() => {
      throw new Error('DUMMY error');
    });
    render(
      <ErrorBoundary>
        <Home />
      </ErrorBoundary>
    );
    await waitFor(() => {
      screen.getByText('Error!');
      screen.getByText('Error: DUMMY error');
      screen.getByText(/Please click/i);
      screen.debug();
    });
  });
});
