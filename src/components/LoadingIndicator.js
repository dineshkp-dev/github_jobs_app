import React from 'react';
import '../styles/loadingindicator.css';

function LoadingIndicator(props) {
  const loadingText =
    (props && props.text) || 'Please wait for the content to be loaded';
  return (
    <div className='loading-indicator-container'>
      <h3 className='loading-title'>Loading...</h3>
      <div className='loading-text'>{loadingText}</div>
    </div>
  );
}

export default LoadingIndicator;
