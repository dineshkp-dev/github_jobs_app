import React, { Component } from 'react';
import '../styles/error.css';
import { HOME_PAGE_LINK } from '../common/constants';

export class ErrorBoundary extends Component {
  state = { error: false };

  static getDerivedStateFromError(error) {
    return { error };
  }

  render() {
    const errorMessage =
      this.state.error && this.state.error.message
        ? this.state.error.message
        : 'Oops! An Error has occurred.';
    return this.state.error ? (
      <div className='error-container'>
        <h1 className='error-title'>Error!</h1>
        <div className='error-msg'>
          <div className='error-text'>{errorMessage}</div>
          <div>
            Please click <a href={HOME_PAGE_LINK}>here</a> to go back to the
            home page
          </div>
        </div>
      </div>
    ) : (
      this.props.children
    );
  }
}

export default ErrorBoundary;
