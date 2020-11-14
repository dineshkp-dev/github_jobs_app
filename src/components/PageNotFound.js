import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/pagenotfound.css';

function PageNotFound() {
  return (
    <div className='pagenotfound-container'>
      <h1 className='pagenotfound-title'>The page does not exist</h1>
      <div className='pagenotfound-msg'>
        Please click <Link to='/'>here</Link> to go to the home page
      </div>
    </div>
  );
}

export default PageNotFound;
