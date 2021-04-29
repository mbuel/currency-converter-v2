import React, {useState, useEffect} from 'react';
import InputDialog from './InputDialog';
import CurrencyTable from './CurrencyTable';
import fx from 'money';
import _ from 'lodash';
import currencyFormatter from '../utils/currencyFormatter';
import FilterNum from '../utils/FilterNum';
import createCurrencyList from '../utils/createCurrencyList';

export default function Container(props) {

  const {currencyList} = props;
  currencyList.rates[currencyList.base] = 1;

  const [rate, setRate] = useState(1);
  const [currencyInput, setCurrencyInput] = useState('$1');
  const [currencyOutput, setCurrencyOutput] = useState('$0');
  const [validBaseCurrency, setValidBaseCurrency] = useState(true);
  const [validToCurrency, setValidToCurrency] = useState(true);
  const [selectBaseCurrency, setSelectBaseCurrency] = useState(currencyList.base);
  const [filteredBaseCurrency, setFilteredBaseCurrency] = useState(createCurrencyList(currencyList.rates));
  const [filteredToCurrency, setFilteredToCurrency] = useState(createCurrencyList(currencyList.rates));
  const [selectToCurrency, setSelectToCurrency] = useState(Object.keys(currencyList.rates)[4]);
  const [baseFormatter, setBaseFormatter] = useState(); 
  const [toFormatter, setToFormatter] = useState();
  const [baseCurrency, setBaseCurrency] = useState(selectBaseCurrency);
  const [toCurrency, setToCurrency] = useState(selectToCurrency);

  useEffect(() => {
    
    if (validBaseCurrency && validToCurrency) {
      fx.baseCurrency = baseCurrency;
      fx.rates = currencyList.rates;
      fx.settings.from = baseCurrency;
      fx.settings.to = toCurrency;
      setBaseFormatter(currencyFormatter(baseCurrency));
      setToFormatter(currencyFormatter(toCurrency));
      
      setRate(_.ceil((fx(1).from(baseCurrency).to(toCurrency)), 4));
      
      setInput(currencyInput);
      
      let output = FilterNum(currencyInput, currencyInput) * rate;
      setOutput(output);
    }
  }, []);

  const setOutput = (num) => {
    validToCurrency && toFormatter && setCurrencyOutput(toFormatter.format(FilterNum(num, currencyOutput)));
  }
  const setInput = (num) => {
    validBaseCurrency && baseFormatter && setCurrencyInput(baseFormatter.format(FilterNum(num, currencyInput)));

  }

  const filterCurrencyList = (item, setFilter) => {
    const list = Object.keys(currencyList.rates).map(el => {
      if (el.indexOf(item) >= 0) {
        return el;
      }
    }).filter((a,b) => a !== undefined);
    setFilter(list);
  }

  const checkCurrency = (currency, setValidCurency, setCurrency, resetFilter) => {
    console.log(Object.keys(currencyList.rates).indexOf(currency) > 0);
    if (currency !== '' && Object.keys(currencyList.rates).indexOf(currency) > 0) {
      setValidCurency(true);
      setCurrency(currency);
      resetFilter(Object.keys(currencyList.rates));
      return true;
    }
    return false;
  }

  /**
   * filters list below input and sets to correct currency
   * @param {DOM} dom element to be modified
   */
  const filterTyping = (dom) => {
    let select = dom.value.length >= 6 ? dom.value.substring(5).trim() : dom.value;

    if (dom.id.includes('baseCurrency')) {
      setValidBaseCurrency(false);
      setSelectBaseCurrency(select.toUpperCase());

      filterCurrencyList(select, setFilteredBaseCurrency);

      checkCurrency(select, setValidBaseCurrency, setBaseCurrency, setFilteredBaseCurrency);

    } else {
      setValidToCurrency(false);
      setSelectToCurrency(select.toUpperCase());

      filterCurrencyList(select, setFilteredToCurrency);

      checkCurrency(select, setValidToCurrency, setToCurrency, setFilteredToCurrency);

    }
  }

  return (
    <React.Fragment>
      <InputDialog 
        baseCurrency={baseCurrency}
        currencyInput={currencyInput} 
        currencyOutput={currencyOutput}
        filteredBaseCurrency={filteredBaseCurrency}
        filteredToCurrency={filteredToCurrency}
        filterTyping={filterTyping}
        selectBaseCurrency={selectBaseCurrency}
        selectToCurrency={selectToCurrency}
        setInput={setInput}
        toCurrency={toCurrency}
        rate={rate}
        updateOutput={setOutput}
        validBaseCurrency={validBaseCurrency}
        validToCurrency={validToCurrency}
      />
      <CurrencyTable 
        currencyList={currencyList} 
        currencyInput={currencyInput} 
      />
    </React.Fragment>
  )
}