import React, { useState, useEffect } from 'react';
import Table from './Table';
import { getJobListing } from '../services/jobListingService';
import LoadingIndicator from './LoadingIndicator';
import ListError from './ListError';
import { useAsyncError } from '../common/commonUtils';

const Home = () => {
  const [jobListing, setJobListing] = useState([]);
  const [error, setError] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const throwError = useAsyncError();
  useEffect(() => {
    async function getJobListingFromService() {
      try {
        let listResponse = await getJobListing();
        if (listResponse.error) {
          setError(true);
          setErrorMsg(listResponse.errorMsg);
        } else {
          setJobListing(listResponse.listings);
        }
      } catch (e) {
        throwError(new Error(e));
      }
    }
    getJobListingFromService();
  }, [throwError]);
  return (
    <div className='start'>
      {jobListing && jobListing.length ? (
        <Table jobs={jobListing} />
      ) : error ? (
        <ListError text={errorMsg} />
      ) : (
        <LoadingIndicator text='Please wait for job listings to be updated' />
      )}
    </div>
  );
};

export default Home;
