import axios from 'axios';
import { jobDetail } from '../utils/testUtils';
import { getJobDetails } from '../../services/jobDetailService';

describe('Get job details test', () => {
  test('Get job details happy path', async () => {
    axios.get = jest.fn(() =>
      Promise.resolve({ data: jobDetail, status: 200 })
    );
    let response = await getJobDetails(jobDetail.id);

    expect(response.error).toBeFalsy();
    expect(response.errorMsg).toBe('');
    expect(response.jobDetail).toBe(jobDetail);
  });

  test('Get job details service response status 404', async () => {
    axios.get = jest.fn(() =>
      Promise.resolve({
        data: jobDetail,
        status: 404,
        statusText: 'Dummy status',
      })
    );
    let response = await getJobDetails(jobDetail.id);

    expect(response.error).toBeTruthy();
    expect(response.errorMsg).toBe(
      'Network Error getting Job details data. Status: Dummy status'
    );
  });

  test('Get job details service response is empty', async () => {
    axios.get = jest.fn(() => Promise.resolve({ data: [], status: 200 }));
    let response = await getJobDetails(jobDetail.id);

    expect(response.error).toBeTruthy();
    expect(response.errorMsg).toBe('No job details available.');
  });

  test('Job id is empty in request', async () => {
    axios.get = jest.fn(() => Promise.resolve({ data: [], status: 200 }));
    let exception = {};
    try {
      await getJobDetails('');
    } catch (e) {
      exception = e;
    }
    expect(exception).toBeTruthy();
    expect(exception).toBe('Job ID cannot be empty');
  });

  test('Get job details service response exception', async () => {
    axios.get = jest.fn(() => Promise.reject({ data: [] }));
    let exception = {};
    try {
      await getJobDetails(jobDetail.id);
    } catch (e) {
      exception = e;
    }
    expect(exception).toBeTruthy();
    expect(exception).toBe(
      'An error occurred when querying for the Job Details, please try again later'
    );
  });
});
