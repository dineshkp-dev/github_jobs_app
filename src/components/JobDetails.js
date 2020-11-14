import React, { useEffect, useState } from 'react';
import '../styles/jobdetails.css';
import parse from 'html-react-parser';
import { getJobDetails } from '../services/jobDetailService';
import { useParams } from 'react-router';
import LoadingIndicator from './LoadingIndicator';
import { useAsyncError } from '../common/commonUtils';
import ListError from './ListError';
import { useHistory } from 'react-router-dom';

function JobDetails() {
  const [jobDetails, setJobDetails] = useState({});
  const [error, setError] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  let { jobid } = useParams();

  console.log(jobid);

  const history = useHistory();
  const throwError = useAsyncError();
  useEffect(() => {
    async function getJobDetailFromService(jobid) {
      let jobDetailResponse = {};
      try {
        jobDetailResponse = await getJobDetails(jobid);
        if (jobDetailResponse.error) {
          setError(true);
          setErrorMsg(jobDetailResponse.errorMsg);
        } else {
          console.log(jobDetailResponse.jobDetail);
          setJobDetails(jobDetailResponse.jobDetail);
        }
      } catch (e) {
        console.log(e);
        throwError(new Error(e));
      }
    }
    getJobDetailFromService(jobid);
  }, [throwError, jobid]);

  return (
    <React.Fragment>
      {Object.keys(jobDetails).length > 0 &&
      jobDetails.constructor === Object ? (
        <React.Fragment>
          <div className='jobdetails-header-container'>
            <div className='jobdetails-goback' onClick={() => history.goBack()}>
              <i class='fas fa-chevron-left'></i> Go Back
            </div>
            <div className='jobdetails-jobtype'>Job type: {jobDetails.type}</div>
            <div className='jobdetails-location'>Job location: {jobDetails.location}</div>
            <div className='jobdetails-createdat'>Created at: {jobDetails.created_at}</div>
            <div className='jobdetails-title'>Job title: {jobDetails.title}</div>
          </div>
          <hr />
          <div className='jobdetails-companydetails-container'>
          <div className='jobdetails-sub-section'>Company Details</div>
            <div className='jobdetails-company'>{jobDetails.company}</div>
            <div className='jobdetails-companyurl'>
              {jobDetails.company_url}
            </div>
          </div>
          <hr />
          <div className='jobdetails-descripton-container'>
            <div className='jobdetails-sub-section'>Job Details</div>
            <div className='jobdetails-description'>
              {parse('' + jobDetails.description)}
            </div>
          </div>
          <hr />
          <div className='jobdetails-howtoapply-container'>
            <div className='jobdetails-sub-section'>How To Apply</div>
            <div className='jobdetails-howtoapply'>
              {parse('' + jobDetails.how_to_apply)}
            </div>
          </div>
        </React.Fragment>
      ) : error ? (
        <ListError text={errorMsg} />
      ) : (
        <LoadingIndicator text='Please wait for job details to be updated' />
      )}
    </React.Fragment>
  );
}

export default JobDetails;
