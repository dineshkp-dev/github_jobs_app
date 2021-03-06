import axios from 'axios';
import { JOB_LISTING_PATH, AXIOS_GET_CONFIG } from '../common/constants';

export function getJobListing() {
  const apiUrl = JOB_LISTING_PATH;

  return new Promise((resolve, reject) => {
    let listResponse = {
      error: false,
      errorMsg: '',
      listings: [],
    };
    axios
      .get(apiUrl, AXIOS_GET_CONFIG)
      .then((response) => {
        if (response && response.status === 200) {
          if (response.data && response.data.length) {
            listResponse.listings = response.data;
          } else {
            listResponse.error = true;
            listResponse.errorMsg = 'No job listings available at the moment.';
          }
          resolve(listResponse);
        } else {
          listResponse.error = true;
          listResponse.errorMsg =
            'Network Error getting Job listing data. Status: ' +
            response.statusText;
          resolve(listResponse);
        }
      })
      .catch((err) => {
        reject(
          'An error occurred when querying for the Job Listings, please try again later'
        );
      });
  });
}
