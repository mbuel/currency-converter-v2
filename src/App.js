import './css/App.css';
import Header from './components/Header';
import CurrencyList from './components/CurrencyList';
import InputDialog from './components/InputDialog';
import LoadingList from './components/LoadingList';
import { useEffect, useState } from 'react';
import axios from 'axios';



function App() {
  const applicationName = 'Simple Currency Converter V2';
  document.querySelector('title').textContent = applicationName;

  const api = 'https://altexchangerateapi.herokuapp.com/latest'
  const base = 'USD';

  const [currencyList, setCurrencyList] = useState();

  useEffect( () => {
    const loadData = async () => {
      let result = await axios(
        `${api}?from=${base}`
      );

      result = JSON.parse(result.request.responseText);
      setCurrencyList(result);
    }
    loadData();
    console.log(currencyList);
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
