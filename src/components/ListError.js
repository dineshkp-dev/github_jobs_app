import React from 'react';
import '../styles/listerror.css';

function ListError(props) {
  const loadingText = (props && props.text) || 'No listings available.';
  return (
    <div className='listerror-container'>
      <h3 className='listerror-title'>No listing found</h3>
      <div className='listerror-text'>{loadingText}</div>
    </div>
  );
}

export default ListError;
