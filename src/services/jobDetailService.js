import axios from 'axios';
import { JOB_DETAILS_PATH, AXIOS_GET_CONFIG } from '../common/constants';

export function getJobDetails(jobid) {
  const apiUrl = JOB_DETAILS_PATH + jobid + '.json';

  return new Promise((resolve, reject) => {
    let jobDetailResponse = {
      error: false,
      errorMsg: '',
      jobDetail: {},
    };
    if (!jobid) {
      reject('Job ID cannot be empty');
    }
    axios
      .get(apiUrl, AXIOS_GET_CONFIG)
      .then((response) => {
        if (response && response.status === 200) {
          if (
            response.data &&
            Object.keys(response.data).length > 0 &&
            response.data.constructor === Object
          ) {
            jobDetailResponse.jobDetail = response.data;
          } else {
            jobDetailResponse.error = true;
            jobDetailResponse.errorMsg = 'No job details available.';
          }
          resolve(jobDetailResponse);
        } else {
          jobDetailResponse.error = true;
          jobDetailResponse.errorMsg =
            'Network Error getting Job details data. Status: ' +
            response.statusText;
          resolve(jobDetailResponse);
        }
      })
      .catch((err) => {
        reject(
          'An error occurred when querying for the Job Details, please try again later'
        );
      });
  });
}
