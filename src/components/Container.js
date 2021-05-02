import React, {useState, useEffect} from 'react';
import InputDialog from './InputDialog';
import CurrencyTable from './CurrencyTable';
import fx, { base } from 'money';
import _ from 'lodash';
import $ from 'jquery';
import currencyFormatter from '../utils/currencyFormatter';
import FilterNum from '../utils/FilterNum';
import createCurrencyList from '../utils/createCurrencyList';

export default function Container(props) {

  const {currencyList, baseCurrency, toCurrency, updateBaseCurrency, updateToCurrency} = props;
  currencyList.rates[currencyList.base] = 1;

  const [rate, setRate] = useState(null);
  const [currencyInput, setCurrencyInput] = useState();
  const [currencyOutput, setCurrencyOutput] = useState();
  const [validBaseCurrency, setValidBaseCurrency] = useState();
  const [validToCurrency, setValidToCurrency] = useState();
  const [selectBaseCurrency, setSelectBaseCurrency] = useState();
  const [filteredBaseCurrency, setFilteredBaseCurrency] = useState();
  const [filteredToCurrency, setFilteredToCurrency] = useState();
  const [selectToCurrency, setSelectToCurrency] = useState();
  
  let baseFormatter; 
  let toFormatter;

  const setOutput = (num) => {
    toFormatter || setMoney();
    let output = FilterNum(num, num) * rate;
    console.log(rate, output);
    validToCurrency && toFormatter && setCurrencyOutput(toFormatter.format(output));
  }

  const setInput = (num) => {
    baseFormatter || setMoney();
    const val = baseFormatter.format(FilterNum(num, currencyInput));
    console.log(val);
    validBaseCurrency && baseFormatter && setCurrencyInput(val);
    setOutput(num);
  }

  const setMoney = () => {
    fx.baseCurrency = baseCurrency;
    fx.rates = currencyList.rates;
    fx.settings.from = baseCurrency;
    fx.settings.to = toCurrency;

    console.log(baseCurrency);

    baseFormatter = currencyFormatter(baseCurrency);
    setValidBaseCurrency(true);

    toFormatter = currencyFormatter(toCurrency);
    setValidToCurrency(true);
    
    setRate(_.ceil((fx(1).from(baseCurrency).to(toCurrency)), 4));
  }

  const checkCurrency = (currency, setValidCurency, setCurrency, resetFilter) => {
    console.log(Object.keys(currencyList.rates).indexOf(currency) > 0);
    if (currency !== '' && Object.keys(currencyList.rates).indexOf(currency) > 0) {
      setCurrency(currency);
      
      setValidCurency(true);
      resetFilter(Object.keys(currencyList.rates));

      return true;
    }
    return false;
  }

  useEffect(() => {
    if (!baseCurrency || !toCurrency) {
      return;
    }
    console.log('update', baseCurrency, toCurrency);
    setFilteredBaseCurrency(createCurrencyList(currencyList.rates));
    setFilteredToCurrency(createCurrencyList(currencyList.rates));
    setSelectBaseCurrency(baseCurrency);
    setSelectToCurrency(toCurrency);

    setMoney();
    setTimeout(() => {
      console.log(currencyInput);
      const currentInput = currencyInput !== undefined ? currencyInput : 1;
      setInput(currentInput);
  
      setInput(currentInput);
      
      setOutput(1);
  
      setOutput(currentInput);
    }, 500);
  }, [baseCurrency, toCurrency, currencyList]);



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

      checkCurrency(currency, setValidBaseCurrency, updateBaseCurrency, setFilteredBaseCurrency);

    } else if (id.includes('transferCurrency')) {
      setValidToCurrency(false);
      setSelectToCurrency(currency.toUpperCase());

      filterCurrencyList(currency, setFilteredToCurrency);

      checkCurrency(currency, setValidToCurrency, updateToCurrency, setFilteredToCurrency);

    }
  }

  const currencySelector = (dom) => {
    const currencyMatch = dom.target.textContent.match(/[A-Z]{3}/).toString();
    const id = $(dom.target).parent().parent().parent().children()[1].id;
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