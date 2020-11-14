import Home from './components/Home';
import JobDetails from './components/JobDetails';
import PageNotFound from './components/PageNotFound';
import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import ErrorBoundary from './components/ErrorBoundary';

function App() {
  return (
    <React.Fragment>
      <Router>
        <ErrorBoundary>
          <Switch>
            <Route exact path='/' component={Home}></Route>
            <Route path='/index.html' component={Home}></Route>
            <Route path='/jobdetails/:jobid' component={JobDetails}></Route>
            <Route component={PageNotFound}></Route>
          </Switch>
        </ErrorBoundary>
        {/* <JobDetails /> */}
      </Router>
    </React.Fragment>
  );
}

export default App;
