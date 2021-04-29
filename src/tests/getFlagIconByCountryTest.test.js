import getFlagIconByCountryCode from '../utils/getFlagIconByCountryCode';

test('Test invalid Country Code', () => {
  const countryCode = 'USD';
  expect(getFlagIconByCountryCode(countryCode)).toBe('');
});