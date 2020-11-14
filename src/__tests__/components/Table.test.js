import Table from '../../components/Table';
import { jobs, multiJobs, multiJobsMultiPage } from '../utils/testUtils';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { userEvent } from '@testing-library/user-event';
import '@testing-library/jest-dom/extend-expect';
import { BrowserRouter as Router } from 'react-router-dom';

describe('Table snapshot test', () => {
  test('renders', () => {
    const { container } = render(
      <Router>
        <Table jobs={jobs} />
      </Router>
    );
    expect(container).toMatchSnapshot();
  });
});

describe('Table pagination test', () => {
  test('pagination test', async () => {
    render(
      <Router>
        <Table jobs={multiJobsMultiPage} />
      </Router>
    );
    expect(screen.getByText('Previous')).toBeInTheDocument();
    expect(screen.getByText('Next')).toBeInTheDocument();
    expect(screen.getByText('1')).toBeInTheDocument();
    expect(screen.getByText('Type')).toBeInTheDocument();
    expect(screen.getByText('Title')).toBeInTheDocument();
    expect(screen.getByText('Location')).toBeInTheDocument();
    expect(screen.getAllByText('Full Time')).toHaveLength(20);
    expect(screen.getAllByText('Full Stack Engineer')).toHaveLength(20);
    expect(screen.getByText('AAA')).toBeInTheDocument();
    expect(
      screen.getByPlaceholderText('Filter by job-location')
    ).toBeInTheDocument();
    const nextButton = screen.getByText('Next');
    fireEvent.click(nextButton);
    await waitFor(() => {
      expect(screen.getByText('ZZZ')).toBeInTheDocument();
    });
  });
});

describe('Table render test', () => {
  test('renders Table', () => {
    render(
      <Router>
        <Table jobs={jobs} />
      </Router>
    );
    expect(screen.getByText('Previous')).toBeInTheDocument();
    expect(screen.getByText('Next')).toBeInTheDocument();
    expect(screen.getByText('1')).toBeInTheDocument();
    expect(screen.getByText('Type')).toBeInTheDocument();
    expect(screen.getByText('Title')).toBeInTheDocument();
    expect(screen.getByText('Location')).toBeInTheDocument();
    expect(screen.getByText('Full Time')).toBeInTheDocument();
    expect(screen.getByText('Full Stack Engineer')).toBeInTheDocument();
    expect(screen.getByText('New York City')).toBeInTheDocument();
    expect(
      screen.getByPlaceholderText('Filter by job-location')
    ).toBeInTheDocument();
  });

  test('when no props are passed', () => {
    render(
      <Router>
        <Table />
      </Router>
    );
    expect(screen.getByText('Type')).toBeInTheDocument();
    expect(screen.getByText('Title')).toBeInTheDocument();
    expect(screen.getByText('Location')).toBeInTheDocument();
    expect(screen.getByText('No Data is available')).toBeInTheDocument();
    expect(
      screen.getByPlaceholderText('Filter by job-location')
    ).toBeInTheDocument();
    screen.debug();
  });

  test('renders Table when jobs is empty', () => {
    const emptyJobs = [];
    render(
      <Router>
        <Table jobs={emptyJobs} />
      </Router>
    );
    expect(screen.getByText('Type')).toBeInTheDocument();
    expect(screen.getByText('Title')).toBeInTheDocument();
    expect(screen.getByText('Location')).toBeInTheDocument();
    expect(screen.getByText('No Data is available')).toBeInTheDocument();
    expect(
      screen.getByPlaceholderText('Filter by job-location')
    ).toBeInTheDocument();
    screen.debug();
  });

  test('renders Table when jobs has multiple values', () => {
    render(
      <Router>
        <Table jobs={multiJobs} />
      </Router>
    );
    expect(screen.getByText('Previous')).toBeInTheDocument();
    expect(screen.getByText('Next')).toBeInTheDocument();
    expect(screen.getByText('1')).toBeInTheDocument();
    expect(screen.getByText('Type')).toBeInTheDocument();
    expect(screen.getByText('Title')).toBeInTheDocument();
    expect(screen.getByText('Location')).toBeInTheDocument();
    expect(screen.getAllByText('Full Time')).toHaveLength(4);
    expect(screen.getAllByText('Full Stack Engineer')).toHaveLength(4);
    expect(screen.getByText('AAA')).toBeInTheDocument();
    expect(screen.getByText('BBB')).toBeInTheDocument();
    expect(screen.getByText('CCC')).toBeInTheDocument();
    expect(screen.getByText('DDD')).toBeInTheDocument();
    expect(
      screen.getByPlaceholderText('Filter by job-location')
    ).toBeInTheDocument();
  });
});

describe('Filtering in table test', () => {
  test('filter table content', async () => {
    render(
      <Router>
        <Table jobs={multiJobs} />
      </Router>
    );
    expect(screen.getByText('AAA')).toBeInTheDocument();
    expect(screen.getByText('BBB')).toBeInTheDocument();
    expect(screen.getByText('CCC')).toBeInTheDocument();
    const inputField = screen.getByPlaceholderText('Filter by job-location');
    fireEvent.change(inputField, { target: { value: 'AAA' } });
    await waitFor(() => {
      expect(screen.getByText('AAA')).toBeInTheDocument();
    });
    expect(screen.queryByText('BBB')).toBeNull();
    expect(screen.queryByText('CCC')).toBeNull();
  });

  test('filter table content and then show all', async () => {
    render(
      <Router>
        <Table jobs={multiJobs} />
      </Router>
    );
    expect(screen.getByText('AAA')).toBeInTheDocument();
    expect(screen.getByText('BBB')).toBeInTheDocument();
    expect(screen.getByText('CCC')).toBeInTheDocument();
    const inputField = screen.getByPlaceholderText('Filter by job-location');
    fireEvent.change(inputField, { target: { value: 'AAA' } });
    await waitFor(() => {
      expect(screen.getByText('AAA')).toBeInTheDocument();
    });
    expect(screen.queryByText('BBB')).toBeNull();
    expect(screen.queryByText('CCC')).toBeNull();
    fireEvent.change(inputField, { target: { value: '' } });
    await waitFor(() => {
      expect(screen.getByText('AAA')).toBeInTheDocument();
    });
    expect(screen.getByText('BBB')).toBeInTheDocument();
    expect(screen.getByText('CCC')).toBeInTheDocument();
  });
});

describe('Sorting in table test', () => {
  test('sorting table content', async () => {
    render(
      <Router>
        <Table jobs={multiJobs} />
      </Router>
    );
    expect(screen.getByText('AAA')).toBeInTheDocument();
    expect(screen.getByText('BBB')).toBeInTheDocument();
    expect(screen.getByText('CCC')).toBeInTheDocument();
    expect(screen.getByText('DDD')).toBeInTheDocument();
    const locationsColumn = screen.getByText('Location');
    fireEvent.click(locationsColumn);
    await waitFor(() => {
      expect(screen.getByText('AAA')).toBeInTheDocument();
    });
    expect(screen.getByText('BBB')).toBeInTheDocument();
    expect(screen.getByText('CCC')).toBeInTheDocument();
    expect(screen.getByText('DDD')).toBeInTheDocument();
    fireEvent.click(locationsColumn);
    await waitFor(() => {
      expect(screen.getByText('AAA')).toBeInTheDocument();
    });
    expect(screen.getByText('BBB')).toBeInTheDocument();
    expect(screen.getByText('CCC')).toBeInTheDocument();
    expect(screen.getByText('DDD')).toBeInTheDocument();
  });
});
