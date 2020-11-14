export const JOBS_PER_PAGE = 20;
export const SORT_ORDER = {
  ASC: 'ASC',
  DESC: 'DESC',
};
export const BASE_URL = process.env.REACT_APP_API_BASE_URL;
export const JOB_LISTING_PATH = process.env.REACT_APP_API_JOB_LISTING_PATH;
export const JOB_DETAILS_PATH = process.env.REACT_APP_API_JOB_DETAILS_PATH;

export const AXIOS_GET_CONFIG = {
  method: 'GET',
  baseURL: BASE_URL,
  timeout: 5000,
  headers: {
    'Access-Control-Allow-Origin': '*',
  },
};

export const HOME_PAGE_LINK =
  process.env.REACT_APP_HOME_PAGE_LINK + '/index.html';
