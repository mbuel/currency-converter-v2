import './css/App.css';
import Header from './components/Header';
import CurrencyList from './components/CurrencyTable';
import Container from './components/Container';
import LoadingInput from './components/LoadingInput';
import { useEffect, useState } from 'react';
import axios from 'axios';
import Footer from './components/Footer';



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

  if (!currencyList) return <LoadingInput />

  // TODO: need to adjust output to be mobile friendly
  return (
    <div className="App">
      <Header application={applicationName} links={'list-object to be populated'} />
      <Container currencyList={currencyList} />
      <Footer />
    </div>
  );
}

export default App;
