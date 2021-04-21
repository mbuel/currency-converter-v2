import './css/App.css';
import Header from './components/Header';
import CurrencyList from './components/CurrencyList';
import InputDialog from './components/InputDialog';
import LoadingList from './components/LoadingList';
import { useEffect, useState } from 'react';



function App() {
  const applicationName = 'Simple Currency Converter V2';
  document.querySelector('title').textContent = applicationName;

  const api = 'https://altexchangerateapi.herokuapp.com/latest'
  const base = 'USD';

  const [currencyList, setCurrencyList] = useState();

  useEffect(() => {
    fetch(`${api}?from=${base}`)
      .then((response) => response.json())
      .then((results) => setCurrencyList(results))
      .catch(() => console.warn('Problem retrieving currencies.'));

  }, []);

  if (!currencyList) return <LoadingList />
  return (
    <div className="App">
      <Header application={applicationName} links={'list-object to be populated'} />
      <InputDialog currencyList={currencyList} />
      <CurrencyList conversionRate={0.84} currencySelected={'USD'} />
    </div>
  );
}

export default App;
