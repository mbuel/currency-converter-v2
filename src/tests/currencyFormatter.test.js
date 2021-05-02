import currencyFormatter from '../utils/currencyFormatter';

test('Valid Country Code USD', () => {
  const currencyToTest = [{cur:'AUD', exp:'A$'}, {cur:'USD', exp:'$'}];

  currencyToTest.forEach(el => {
    const fmt = currencyFormatter(el.cur);
    expect(fmt.format(1)).toBe(`${el.exp}1.00`);

  })
});

