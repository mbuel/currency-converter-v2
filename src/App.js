import './css/App.css';
import Header from './components/Header';
import Container from './components/Container';
import LoadingInput from './components/LoadingInput';
import { useEffect, useState } from 'react';
// import axios from 'axios';
import LoadData from './utils/LoadData';
import Footer from './components/Footer';



function App() {
  const applicationName = 'Simple Currency Converter V2';
  document.querySelector('title').textContent = applicationName;

  const api = 'https://altexchangerateapi.herokuapp.com/latest'

  const [base, setBase] = useState('USD');
  const [currencyList, setCurrencyList] = useState();
  const [baseCurrency, setBaseCurrency] = useState();
  const [toCurrency, setToCurrency] = useState();

  const init = (result) => {
    
        setCurrencyList(result);
        setBaseCurrency(result.base);
        setToCurrency(!toCurrency ? Object.keys(result.rates)[0] : toCurrency);

  }
  
  useEffect( () => {
    LoadData(`${api}?from=${base}`, init);
  }, [base]);

  const updateBaseCurrency = (baseCurrency) => {
    setBase(baseCurrency);
    console.log(baseCurrency);
    setTimeout(() => LoadData.bind(this, [`${api}?from=${base}`, init]), 350);
  }

  const updateToCurrency = (toCurrency) => {
    setToCurrency(toCurrency);
    // setCurrencyList(null);
    setTimeout(() => LoadData.bind(this, [`${api}?from=${base}`, init]), 350);
  }

  if (!currencyList) return <LoadingInput />

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
