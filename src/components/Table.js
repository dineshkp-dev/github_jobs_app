import React, { useState, useMemo } from 'react';
import TableData from './TableData';
import Pagination from './Pagination';
import { JOBS_PER_PAGE, SORT_ORDER } from '../common/constants';
import '../styles/table.css';

function Table(props) {
  const jobs = (props && props.jobs) || [];

  const [validJobTotal, setValidJobTotal] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchText, setSearchText] = useState('');
  const [sortLocation, setSortLocation] = useState(false);
  const [sortOrder, setSortOrder] = useState(SORT_ORDER.ASC);

  const jobsData = useMemo(() => {
    let validJobs = jobs;
    if (searchText) {
      validJobs = validJobs.filter((job) =>
        job.location.toLowerCase().includes(searchText.toLowerCase())
      );
    }
    if (sortLocation) {
      validJobs = validJobs.sort((a, b) => {
        if (sortOrder === SORT_ORDER.ASC) {
          return a.location.localeCompare(b.location);
        } else {
          return b.location.localeCompare(a.location);
        }
      });
    }
    setValidJobTotal(validJobs.length);
    return validJobs.slice(
      (currentPage - 1) * JOBS_PER_PAGE,
      (currentPage - 1) * JOBS_PER_PAGE + JOBS_PER_PAGE
    );
  }, [jobs, currentPage, searchText, sortOrder, sortLocation]);

  const getSearchText = (e) => {
    const text = e.target.value;
    setSearchText(text);
    setCurrentPage(1);
  };

  return (
    <React.Fragment>
      <div className='table'>
        <div className='table-title'>
          <h1>Job details</h1>
        </div>
        <div id='table-header-container'>
          <Pagination
            total={validJobTotal}
            itemsPerPage={JOBS_PER_PAGE}
            currentPage={currentPage}
            onPageChange={(page) => setCurrentPage(page)}
          />
          <div className='search-container'>
            <input
              type='text'
              id='search-input'
              className='search-input'
              value={searchText}
              onChange={(e) => getSearchText(e)}
              placeholder='  Filter by job-location'
            />
          </div>
        </div>
        <table className='table-element'>
          <thead>
            <tr>
              <th>Type </th>
              <th>Title</th>
              <th
                onClick={(e) => {
                  setSortLocation(true);
                  sortOrder === SORT_ORDER.ASC
                    ? setSortOrder(SORT_ORDER.DESC)
                    : setSortOrder(SORT_ORDER.ASC);
                }}
                className='sortable-column'
              >
                Location{' '}
                {sortLocation ? (
                  sortOrder === SORT_ORDER.ASC ? (
                    <i className='fas fa-angle-up'></i>
                  ) : (
                    <i className='fas fa-angle-down'></i>
                  )
                ) : null}
              </th>
            </tr>
          </thead>
          <tbody>
            {jobsData && jobsData.length ? (
              jobsData.map((job) => <TableData key={job.id} jobdetail={job} />)
            ) : (
              <tr>
                <td colSpan='10'>
                  <div className='no-data-available'>No Data is available</div>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </React.Fragment>
  );
}

export default Table;
