import { getJobListing } from '../../services/jobListingService';
import axios from 'axios';
import { jobs } from '../utils/testUtils';

describe('Get job listing test', () => {
  test('Get job listing happy path', async () => {
    axios.get = jest.fn(() => Promise.resolve({ data: jobs, status: 200 }));
    let response = await getJobListing();

    expect(response.error).toBeFalsy();
    expect(response.errorMsg).toBe('');
    expect(response.listings).toBe(jobs);
  });

  test('Get job listings response status 404', async () => {
    axios.get = jest.fn(() =>
      Promise.resolve({ data: jobs, status: 404, statusText: 'Dummy status' })
    );
    let response = await getJobListing();

    expect(response.error).toBeTruthy();
    expect(response.errorMsg).toBe(
      'Network Error getting Job listing data. Status: Dummy status'
    );
  });

  test('Get job listings response is empty', async () => {
    axios.get = jest.fn(() => Promise.resolve({ data: [], status: 200 }));
    let response = await getJobListing();

    expect(response.error).toBeTruthy();
    expect(response.errorMsg).toBe('No job listings available at the moment.');
  });

  test('Get job listings response exception', async () => {
    axios.get = jest.fn(() => Promise.reject({ data: [] }));
    let exception = {};
    try {
      await getJobListing();
    } catch (e) {
      exception = e;
    }
    expect(exception).toBeTruthy();
    expect(exception).toBe(
      'An error occurred when querying for the Job Listings, please try again later'
    );
  });
});
