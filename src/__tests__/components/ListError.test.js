import ListError from '../../components/ListError';
import { render } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';

describe('ListError snapshot test', () => {
  test('renders', () => {
    const { container } = render(<ListError />);
    expect(container).toMatchSnapshot();
  });
});
