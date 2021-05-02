import React, {useState, useEffect} from 'react';
import InputDialog from './InputDialog';
import CurrencyTable from './CurrencyTable';
import $ from 'jquery';
import currencyFormatter from '../utils/currencyFormatter';
import FilterNum from '../utils/FilterNum';
import createCurrencyList from '../utils/createCurrencyList';

export default function Container(props) {

  const {currencyList, baseCurrency, toCurrency, updateBaseCurrency, updateToCurrency} = props;
  currencyList.rates[currencyList.base] = 1;

  const [rate, setRate] = useState(null);
  const [currencyInput, setCurrencyInput] = useState();
  const [validBaseCurrency, setValidBaseCurrency] = useState();
  const [validToCurrency, setValidToCurrency] = useState();
  const [selectBaseCurrency, setSelectBaseCurrency] = useState();
  const [filteredBaseCurrency, setFilteredBaseCurrency] = useState();
  const [filteredToCurrency, setFilteredToCurrency] = useState();
  const [selectToCurrency, setSelectToCurrency] = useState();
  
  let baseFormatter; 
  let toFormatter;



  const setInput = (num) => {
    baseFormatter || setMoney();
    const val = baseFormatter.format(FilterNum(num, currencyInput));
    console.log(val);
    validBaseCurrency && baseFormatter && setCurrencyInput(val);
  }

  const setMoney = () => {
    baseFormatter = currencyFormatter(baseCurrency);
    setValidBaseCurrency(true);

    toFormatter = currencyFormatter(toCurrency);
    setValidToCurrency(true);
    
    setRate(currencyList.rates[toCurrency]);
  }

  const checkCurrency = (currency, setValidCurency, setCurrency, resetFilter) => {
    console.log(currencyList.rates[currency]);
    if (currencyList.rates[currency] !== undefined) {
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
    setFilteredBaseCurrency(createCurrencyList(currencyList.rates));
    setFilteredToCurrency(createCurrencyList(currencyList.rates));
    setSelectBaseCurrency(baseCurrency);
    setSelectToCurrency(toCurrency);

    setMoney();

    setTimeout(() => {
      
      const currentInput = currencyInput !== undefined ? currencyInput : 1;
      setInput(currentInput);
  
      setInput(currentInput);
      
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
    let select = dom.value.match(/[aA-zZ]{0,3}/).toString().toUpperCase();
    console.log(select);
    setValidBaseCurrency(false);
    setCurrencySelectionByID(dom.id, select);

  }

  /**
   * Determines if valid currency entered or selected, then sets the state appropriately
   * @param {CSS} id - CSS ID of element
   * @param {String} currency Currency selected by typing or from drop down
   */
  const setCurrencySelectionByID = (id, currency) => {
    if (id.includes('baseCurrency')) {
      
      setSelectBaseCurrency(currency.toUpperCase());

      filterCurrencyList(currency, setFilteredBaseCurrency);

      checkCurrency(currency, setValidBaseCurrency, updateBaseCurrency, setFilteredBaseCurrency);

    } else if (id.includes('transferCurrency')) {
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
        currencySelector={currencySelector}
        filteredBaseCurrency={filteredBaseCurrency}
        filteredToCurrency={filteredToCurrency}
        filterTyping={filterTyping}
        selectBaseCurrency={selectBaseCurrency}
        selectToCurrency={selectToCurrency}
        setInput={setInput}
        toCurrency={toCurrency}
        rate={rate}
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