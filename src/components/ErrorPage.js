import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/error.css';

function ErrorPage(props) {
  const errorMessage =
    (props && props.errorMessage) || 'Oops! An error occured.';
  return (
    <div className='error-container'>
      <h1 className='error-title'>Error!</h1>
      <div className='error-msg'>
        <div className='error-text'>{errorMessage}</div>
        Please click <Link to='/'>here</Link> to go back to the home page
      </div>
    </div>
  );
}

export default ErrorPage;
