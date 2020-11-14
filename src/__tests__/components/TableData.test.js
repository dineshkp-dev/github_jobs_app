import TableData from '../../components/TableData';
import { jobDetail } from '../utils/testUtils';
import { render } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import { BrowserRouter as Router } from 'react-router-dom';

describe('TableData snapshot test', () => {
  test('renders', () => {
    const { container } = render(
      <Router>
        <TableData jobdetail={jobDetail} />
      </Router>
    );
    expect(container).toMatchSnapshot();
  });
});
