import { render, screen } from '@testing-library/react';
import Header from '../components/Header';

test('renders correct header', () => {
  const application = 'test suite';
  render(<Header application={application}/>);
  const linkElement = screen.getByText(/test suite/i);
  expect(linkElement).toBeDefined();
});
