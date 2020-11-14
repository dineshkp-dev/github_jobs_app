import React from 'react';
import ReactDOM from 'react-dom';
import App from '../App';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
jest.mock('react-dom', () => ({ render: jest.fn() }));

describe('Application root', () => {
  it('should render without crashing', () => {
    const div = document.createElement('div');
    div.id = 'root';
    document.body.appendChild(div);
    require('../index.js');
    expect(ReactDOM.render).toHaveBeenCalled();
  });
});
