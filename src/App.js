import logo from './logo.svg';
import './css/App.css';
import Header from './components/Header';
import CurrencyList from './components/CurrencyList';

const applicationName = 'Currency Converter V2';
document.querySelector('title').textContent = applicationName;

function App() {
  return (
    <div className="App">
      <Header application={applicationName} links={'list-object to be populated'} />
      <CurrencyList conversionRate={0.84} currencySelected={'USD'} />
    </div>
  );
}

export default App;
