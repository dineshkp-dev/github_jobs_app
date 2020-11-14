import React, { useState, useEffect, useMemo } from 'react';
import { JOBS_PER_PAGE } from '../common/constants';
import '../styles/pagination.css';

function Pagination(props) {
  const { total, currentPage, onPageChange } = props;
  const [totalPages, setTotalPages] = useState(0);

  useEffect(() => {
    if (total && JOBS_PER_PAGE) {
      setTotalPages(Math.ceil(total / JOBS_PER_PAGE));
    }
  }, [total]);

  const paginationItems = useMemo(() => {
    const pages = [];
    for (let i = 1; i <= totalPages; i++) {
      pages.push(
        <div key={i} className='pagination-class-indicator'>
          {currentPage === i ? (
            <div className='pagination-page active-page'>{i}</div>
          ) : (
            <div className='pagination-page'>{i}</div>
          )}
        </div>
      );
    }
    return pages;
  }, [totalPages, currentPage]);

  if (!!!totalPages) {
    return null;
  }

  const isNextButtonActive = () => {
    return !!!(currentPage + 1 > totalPages);
  };

  const isPreviousButtonActive = () => {
    return !!!(currentPage - 1 === 0);
  };

  return (
    <div className='pagination-container'>
      {isPreviousButtonActive() ? (
        <div className='button' onClick={() => onPageChange(currentPage - 1)}>
          <div className='button-text'>Previous</div>
        </div>
      ) : (
        <div className='button-disabled'>
          <div className='button-text'>Previous</div>
        </div>
      )}

      {paginationItems}
      {isNextButtonActive() ? (
        <div className='button' onClick={() => onPageChange(currentPage + 1)}>
          <div className='button-text'>Next</div>
        </div>
      ) : (
        <div className='button-disabled'>
          <div className='button-text'>Next</div>
        </div>
      )}
    </div>
  );
}

export default Pagination;
