import ErrorPage from '../../components/ErrorPage';
import { BrowserRouter as Router } from 'react-router-dom';
import { render } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';

describe('ErrorBoundary snapshot test', () => {
  test('renders', () => {
    const { container } = render(
      <Router>
        <ErrorPage />
      </Router>
    );
    expect(container).toMatchSnapshot();
  });
});
