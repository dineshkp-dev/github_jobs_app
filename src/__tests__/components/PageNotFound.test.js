import PageNotFound from '../../components/PageNotFound';
import { BrowserRouter as Router } from 'react-router-dom';
import { render } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';

describe('PageNotFound snapshot test', () => {
  test('renders', () => {
    const { container } = render(
      <Router>
        <PageNotFound />
      </Router>
    );
    expect(container).toMatchSnapshot();
  });
});
