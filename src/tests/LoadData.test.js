import LoadData from '../utils/LoadData';


test('valid endpoint', () => {
  const api = 'https://altexchangerateapi.herokuapp.com/currencies';
  let results = undefined;
  const setTest = (result) => {
    console.log(result);
    results = result;
    expect(results).toBe('1');
  }
  LoadData(api, setTest)
  
});