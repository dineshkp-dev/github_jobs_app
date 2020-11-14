import LoadingIndicator from '../../components/LoadingIndicator';
import { render } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';

describe('LoadingIndicator snapshot test', () => {
  test('renders', () => {
    const { container } = render(<LoadingIndicator />);
    expect(container).toMatchSnapshot();
  });
});
