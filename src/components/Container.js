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

  const filterCurrencyList = (item, filteredList, setFilter) => {
    // setFilter(currency);
    console.dir(filteredList);
    setFilter && setFilter(filteredList.map((a) => {
      if (a.indexOf(item) > 0) {
        return a;
      } 
    })).filter((a,b) => a !== undefined);
    console.log(filteredList);
  }

  const checkCurrency = (currency, setFilter, currencyList) => {
    if (currencyList.indexOf(currency) > 0) {

      return true;
    }
    return false;
  }

  const filterTyping = (dom) => {
    console.log(dom.value.length);
    let select = dom.value.length >= 6 ? dom.value.substring(5).trim() : dom.value;
    if (dom.id.includes('baseCurrency')) {
      setValidBaseCurrency(false);
      setSelectBaseCurrency(select.toUpperCase());
      console.log(filteredBaseCurrency);
      // filterCurrencyList(select, filteredBaseCurrency, setFilteredBaseCurrency);
      const list = Object.keys(currencyList.rates).map(el => {
        if (el.indexOf(select) >= 0) {
          return el;
        }
      }).filter((a,b) => a !== undefined);
      setFilteredBaseCurrency(list);
      console.log(list);

    } else {
      setValidToCurrency(false);
      setSelectToCurrency(select.toUpperCase());
      filterCurrencyList(select, filteredToCurrency, setFilteredToCurrency);
      setValidToCurrency(checkCurrency(select, setFilteredToCurrency, filteredToCurrency));
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