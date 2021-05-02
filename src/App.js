import './css/App.css';
import Header from './components/Header';
import Container from './components/Container';
import LoadingInput from './components/LoadingInput';
import { useEffect, useState } from 'react';
import axios from 'axios';
import Footer from './components/Footer';



function App() {
  const applicationName = 'Simple Currency Converter V2';
  document.querySelector('title').textContent = applicationName;

  const api = 'https://altexchangerateapi.herokuapp.com/latest'

  const [base, setBase] = useState('USD');
  const [currencyList, setCurrencyList] = useState();
  const [baseCurrency, setBaseCurrency] = useState();
  const [toCurrency, setToCurrency] = useState();
  
  const loadData = async () => {
    let result = await axios(
      `${api}?from=${base}`
    );

    result = JSON.parse(result.request.responseText);

    setCurrencyList(result);
    setBaseCurrency(result.base);
    setToCurrency(!toCurrency ? Object.keys(result.rates)[0] : toCurrency);
  }

  useEffect( () => {
    loadData();
  }, [base]);

  const updateBaseCurrency = (baseCurrency) => {
    setBase(baseCurrency);
    console.log(baseCurrency);
    setTimeout(() => loadData, 350);
  }

  const updateToCurrency = (toCurrency) => {
    setToCurrency(toCurrency);
    // setCurrencyList(null);
    setTimeout(() => loadData, 350);
  }

  if (!currencyList) return <LoadingInput />

  // TODO: need to adjust output to be mobile friendly
  return (
    <div className="App">
      <Header application={applicationName} links={'list-object to be populated'} />
      <Container 
        currencyList={currencyList} 
        baseCurrency={baseCurrency}
        toCurrency={toCurrency}
        updateBaseCurrency={updateBaseCurrency}
        updateToCurrency={updateToCurrency}
      />
      <Footer />
    </div>
  );
}

export default App;
