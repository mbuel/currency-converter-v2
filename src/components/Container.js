import React, {useState, useEffect} from 'react';
import InputDialog from './InputDialog';
import CurrencyTable from './CurrencyTable';
import fx from 'money';
import _ from 'lodash';
import $ from 'jquery';
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

  const setOutput = (num) => {
    let output = FilterNum(num, num) * rate;
    validToCurrency && toFormatter && setCurrencyOutput(toFormatter.format(output));
  }

  const setInput = (num) => {
    validBaseCurrency && baseFormatter && setCurrencyInput(baseFormatter.format(FilterNum(num, currencyInput)));

  }

  const setMoney = () => {
    fx.baseCurrency = baseCurrency;
    fx.rates = currencyList.rates;
    fx.settings.from = baseCurrency;
    fx.settings.to = toCurrency;

    console.log(fx.rates, currencyList.rates);

    setBaseFormatter(currencyFormatter(baseCurrency));
    setToFormatter(currencyFormatter(toCurrency));
    
    setRate(_.ceil((fx(1).from(baseCurrency).to(toCurrency)), 4));
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

  useEffect(() => {
    setMoney();
    
    setInput(currencyInput);
    
    // FIXED: this seems to have stopped working
    // FIXED: Output currency value is "$" no matter what
    // let output = FilterNum(currencyInput, currencyInput) * rate;
    setOutput(currencyInput);
  }, [baseCurrency, toCurrency, checkCurrency]);



  const filterCurrencyList = (item, setFilter) => {
    const list = Object.keys(currencyList.rates).map(el => {
      if (el.indexOf(item) >= 0) {
        return el;
      }
    }).filter((a,b) => a !== undefined);
    setFilter(list);
  }

  /**
   * filters list below input and sets to correct currency
   * @param {DOM} dom element to be modified
   */
  const filterTyping = (dom) => {
    let select = dom.value.match(/[A-Z]{0,3}/).toString();
    setCurrencySelectionByID(dom.id, select);

  }

  /**
   * Determines if valid currency entered or selected, then sets the state appropriately
   * @param {CSS} id - CSS ID of element
   * @param {String} currency Currency selected by typing or from drop down
   */
  const setCurrencySelectionByID = (id, currency) => {
    if (id.includes('baseCurrency')) {
      setValidBaseCurrency(false);
      setSelectBaseCurrency(currency.toUpperCase());

      filterCurrencyList(currency, setFilteredBaseCurrency);

      checkCurrency(currency, setValidBaseCurrency, setBaseCurrency, setFilteredBaseCurrency);

    } else if (id.includes('transferCurrency')) {
      setValidToCurrency(false);
      setSelectToCurrency(currency.toUpperCase());

      filterCurrencyList(currency, setFilteredToCurrency);

      checkCurrency(currency, setValidToCurrency, setToCurrency, setFilteredToCurrency);

    }
  }

  const currencySelector = (dom) => {
    console.log(dom.target.textContent);
    const currencyMatch = dom.target.textContent.match(/[A-Z]{3}/).toString();
    const id = $(dom.target).parent().parent().parent().children()[0].id;
    console.log(id);
    setCurrencySelectionByID(id, currencyMatch);
  }

  return (
    <React.Fragment>
      <InputDialog 
        baseCurrency={baseCurrency}
        currencyInput={currencyInput} 
        currencyOutput={currencyOutput}
        currencySelector={currencySelector}
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