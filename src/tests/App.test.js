import { render, screen } from '@testing-library/react';
import Header from '../components/Header';
import Footer from '../components/Footer';

test('renders correct header', () => {
  const application = 'test suite';
  render(<Header application={application}/>);
  const linkElement = screen.getByText(/test suite/i);
  expect(linkElement).toBeDefined();
});

test('renders correct footer', () => {
  render(<Footer />);
  const linkElement = screen.getByText(/Morris Buel/i);
  expect(linkElement).toBeDefined();
});
