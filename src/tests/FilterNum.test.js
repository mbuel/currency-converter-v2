import FilterNum from '../utils/FilterNum';

test('Test FilterNum Valid (HK$1.00)', () => {
  const input = 'HK$1.00';
  expect(FilterNum(input)).toBe('1.00');
});

test('Test FilterNum Valid $1)', () => {
  const input = '$1';
  expect(FilterNum(input)).toBe('1');
});

test('Test FilterNum imValid', () => {
  const input = null;
  expect(FilterNum(input)).toBe('1');
});