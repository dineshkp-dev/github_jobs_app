import Pagination from '../../components/Pagination';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';

describe('Pagination snapshot test', () => {
  const totalJobs = 5;
  const currentPage = 1;
  test('renders', () => {
    const { container } = render(
      <Pagination total={totalJobs} currentPage={currentPage} />
    );
    expect(container).toMatchSnapshot();
  });
});

describe('Pagination render test', () => {
  test('renders Home with one page only', () => {
    const totalJobs = 5;
    const currentPage = 2;
    render(<Pagination total={totalJobs} currentPage={currentPage} />);
    expect(screen.getByText('Previous')).toBeInTheDocument();
    expect(screen.getByText('Next')).toBeInTheDocument();
    expect(screen.getByText('1')).toBeInTheDocument();
  });

  test('renders Pagination with multiple pages', () => {
    const totalJobs = 35;
    const currentPage = 2;
    render(<Pagination total={totalJobs} currentPage={currentPage} />);
    expect(screen.getByText('Previous')).toBeInTheDocument();
    expect(screen.getByText('Next')).toBeInTheDocument();
    expect(screen.getByText('1')).toBeInTheDocument();
    expect(screen.getByText('2')).toBeInTheDocument();
  });

  test('renders Pagination with 0 pages', () => {
    const totalJobs = 0;
    const currentPage = 2;
    render(<Pagination total={totalJobs} currentPage={currentPage} />);
  });
});

// fireEvent.click(screen.getByText('Load Greeting'))
describe('Pagination simulate navigation', () => {
  test('navigate next', async () => {
    const totalJobs = 30;
    const currentPage = 1;
    let nextPage = 1;
    const onPageChange = (newPageNumber) => {
      nextPage = newPageNumber;
    };
    render(
      <Pagination
        total={totalJobs}
        currentPage={currentPage}
        onPageChange={(page) => onPageChange(page)}
      />
    );
    expect(screen.getByText('Previous')).toBeInTheDocument();
    expect(screen.getByText('Next')).toBeInTheDocument();
    expect(screen.getByText('1')).toBeInTheDocument();
    expect(screen.getByText('2')).toBeInTheDocument();
    fireEvent.click(screen.getByText('Next'));
    await waitFor(() => {
      expect(nextPage).toBe(2);
    });
  });

  test('navigate next then previous page', async () => {
    const totalJobs = 30;
    const currentPage = 2;
    let newlyChangedPageNumber = 2;
    const onPageChange = (newPageNumber) => {
      newlyChangedPageNumber = newPageNumber;
    };
    render(
      <Pagination
        total={totalJobs}
        currentPage={currentPage}
        onPageChange={(page) => onPageChange(page)}
      />
    );
    expect(screen.getByText('Previous')).toBeInTheDocument();
    expect(screen.getByText('Next')).toBeInTheDocument();
    expect(screen.getByText('1')).toBeInTheDocument();
    expect(screen.getByText('2')).toBeInTheDocument();
    fireEvent.click(screen.getByText('Next'));
    await waitFor(() => {
      expect(newlyChangedPageNumber).toBe(2);
    });
    fireEvent.click(screen.getByText('Previous'));
    await waitFor(() => {
      expect(newlyChangedPageNumber).toBe(1);
    });
  });

  test('navigate next then previous page and stop', async () => {
    const totalJobs = 30;
    const currentPage = 2;
    let newlyChangedPageNumber = 2;
    const onPageChange = (newPageNumber) => {
      newlyChangedPageNumber = newPageNumber;
    };
    render(
      <Pagination
        total={totalJobs}
        currentPage={currentPage}
        onPageChange={(page) => onPageChange(page)}
      />
    );
    expect(screen.getByText('Previous')).toBeInTheDocument();
    expect(screen.getByText('Next')).toBeInTheDocument();
    expect(screen.getByText('1')).toBeInTheDocument();
    expect(screen.getByText('2')).toBeInTheDocument();
    fireEvent.click(screen.getByText('Next'));
    await waitFor(() => {
      expect(newlyChangedPageNumber).toBe(2);
    });
    fireEvent.click(screen.getByText('Previous'));
    await waitFor(() => {
      expect(newlyChangedPageNumber).toBe(1);
    });
    fireEvent.click(screen.getByText('Previous'));
    await waitFor(() => {
      expect(newlyChangedPageNumber).toBe(1);
    });
  });

  test('navigate next and stop', async () => {
    const totalJobs = 30;
    const currentPage = 1;
    let nextPage = 1;
    const onPageChange = (newPageNumber) => {
      nextPage = newPageNumber;
    };
    render(
      <Pagination
        total={totalJobs}
        currentPage={currentPage}
        onPageChange={(page) => onPageChange(page)}
      />
    );
    expect(screen.getByText('Previous')).toBeInTheDocument();
    expect(screen.getByText('Next')).toBeInTheDocument();
    expect(screen.getByText('1')).toBeInTheDocument();
    expect(screen.getByText('2')).toBeInTheDocument();
    fireEvent.click(screen.getByText('Next'));
    await waitFor(() => {
      expect(nextPage).toBe(2);
    });
    fireEvent.click(screen.getByText('Next'));
    await waitFor(() => {
      expect(nextPage).toBe(2);
    });
    screen.debug();
  });
});
