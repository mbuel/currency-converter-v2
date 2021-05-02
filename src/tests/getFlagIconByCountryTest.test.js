import getFlagIconByCountryCode from '../utils/getFlagIconByCountryCode';

test('Invalid Country Code', () => {
  const currencyCode = 'AUD';
  const countryIcon = getFlagIconByCountryCode(currencyCode);
  console.log(countryIcon);
  expect(countryIcon).toBe('🇦🇺');
});