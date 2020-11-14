import ErrorBoundary from '../../components/ErrorBoundary';
import { render } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';

describe('ErrorBoundary snapshot test', () => {
  test('renders', () => {
    const { container } = render(
      <ErrorBoundary children={<div>dummy component</div>} />
    );
    expect(container).toMatchSnapshot();
  });
});
