import JobDetails from '../../components/JobDetails';
import { MemoryRouter } from 'react-router-dom';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { jobdetails } from '../utils/testUtils';
import ErrorBoundary from '../../components/ErrorBoundary';
import '@testing-library/jest-dom/extend-expect';

const jobDetailService = require('../../services/jobDetailService');

describe('JobDetails snapshot test', () => {
  test('renders', () => {
    jobDetailService.getJobDetails = jest.fn(() => Promise.resolve(jobdetails));
    const { container } = render(
      <MemoryRouter initialEntries={['/testid']}>
        <JobDetails />
      </MemoryRouter>
    );
    expect(container).toMatchSnapshot();
  });
});

describe('JobDetails render test', () => {
  test('renders JobDetails', () => {
    jobDetailService.getJobDetails = jest.fn(() => Promise.resolve(jobdetails));
    render(
      <MemoryRouter initialEntries={['/testid']}>
        <JobDetails />
      </MemoryRouter>
    );
    expect(screen.getByText('Loading...')).toBeInTheDocument();
    expect(
      screen.getByText('Please wait for job details to be updated')
    ).toBeInTheDocument();
  });
});

describe('JobDetails get results test', () => {
  test('get success results from Details Service', async () => {
    jobDetailService.getJobDetails = jest.fn(() => Promise.resolve(jobdetails));
    render(
      <MemoryRouter initialEntries={['/testid']}>
        <JobDetails />
      </MemoryRouter>
    );
    await waitFor(() => {
      screen.getByText('Job type: Full Time');
      screen.getByText('Job Details');
      screen.getByText('Job title: Full Stack Engineer');
      screen.getByText('Job location: New York City');
      screen.getByText('Please apply at the following website:');
    });
  });

  test('Job Details and go back', async () => {
    jobDetailService.getJobDetails = jest.fn(() => Promise.resolve(jobdetails));
    render(
      <MemoryRouter initialEntries={['/testid']}>
        <JobDetails />
      </MemoryRouter>
    );
    await waitFor(() => {
      screen.getByText('Job type: Full Time');
      screen.getByText('Job Details');
      screen.getByText('Job title: Full Stack Engineer');
      screen.getByText('Job location: New York City');
      screen.getByText('Please apply at the following website:');
    });
    const goBack = screen.getByText(/Go Back/);
    fireEvent.click(goBack);
    await waitFor(() => {
      screen.getByText('Job Details');
    });
  });
});

describe('get empty results from JobDetails service test', () => {
  test('get dummy errorf results from Details Service', async () => {
    let errorListings = jobdetails;
    errorListings.error = true;
    errorListings.errorMsg = 'Dummy error message';
    jobDetailService.getJobDetails = jest.fn(() =>
      Promise.resolve(errorListings)
    );
    render(
      <MemoryRouter initialEntries={['/testid']}>
        <JobDetails />
      </MemoryRouter>
    );
    await waitFor(() => {
      screen.getByText('No listing found');
      screen.getByText('Dummy error message');
    });
  });

  test('Reject from JobDetails Service', async () => {
    jobDetailService.getJobDetails = jest.fn(() =>
      Promise.reject('DUMMY error')
    );
    render(
      <MemoryRouter initialEntries={['/testid']}>
        <ErrorBoundary>
          <JobDetails />
        </ErrorBoundary>
      </MemoryRouter>
    );
    await waitFor(() => {
      screen.getByText('Error!');
      screen.getByText('DUMMY error');
      screen.getByText(/Please click/i);
      screen.debug();
    });
  });

  test('Exception from JobDetails Service', async () => {
    jobDetailService.getJobDetails = jest.fn(() => {
      throw new Error('DUMMY error');
    });
    render(
      <MemoryRouter initialEntries={['/testid']}>
        <ErrorBoundary>
          <JobDetails />
        </ErrorBoundary>
      </MemoryRouter>
    );
    await waitFor(() => {
      screen.getByText('Error!');
      screen.getByText('Error: DUMMY error');
      screen.getByText(/Please click/i);
      screen.debug();
    });
  });
});
