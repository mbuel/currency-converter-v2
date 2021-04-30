import React from 'react';
import '../css/InputDialog.css';
import ConversionOutput from './sub-Components/ConversionOutput';
import InputDropDown from './sub-Components/InputDropDown';
import InputHeader from './sub-Components/InputHeader';
import CurrencyInput from './sub-Components/CurrencyInput';
import getFlagIconByCountryCode from '../utils/getFlagIconByCountryCode';


function InputDialog(props) {


  const {
    baseCurrency,
    currencyInput, 
    currencyOutput,
    currencySelector,
    filteredBaseCurrency,
    filteredToCurrency,
    filterTyping,
    rate,
    selectBaseCurrency,
    selectToCurrency,
    setInput,
    toCurrency,
    validBaseCurrency,
    validToCurrency
    } = props;
    


  // deal with inputs changing
  const handler = (e) => {
    if(e.target.id.indexOf('appendedInput') > 0) {
      filterTyping(e.target);
    } else {
      setInput(e.target.value);
    }
  }

  const baseCurrencySelectorValue = validBaseCurrency === true ? `${getFlagIconByCountryCode(baseCurrency, validBaseCurrency)} ${selectBaseCurrency}` : selectBaseCurrency;
  const toCurrencySelectorValue = validToCurrency === true ? `${getFlagIconByCountryCode(toCurrency, validToCurrency)} ${selectToCurrency}` : selectToCurrency;

  return (
    <div className="converter">
      <div className="pt-5 container-fluid">
        <InputHeader />
        <div className="row">
          <div className="col-4">
            <CurrencyInput 
              handler={handler} 
              value={currencyInput}
            />
          </div>
          <div className="col-4">
            <InputDropDown 
              handler={handler} 
              currencyListKeys={filteredBaseCurrency} 
              id="baseCurrency" 
              value={baseCurrencySelectorValue}
              currencySelector={currencySelector}
            />
          </div>
          <div className="col-4">
            <InputDropDown 
              handler={handler} 
              currencyListKeys={filteredToCurrency} 
              id="transferCurrency" 
              value={toCurrencySelectorValue}
              currencySelector={currencySelector}
            />
          </div>
        </div>
        <div className="row">
          <div className="col-4">
            <ConversionOutput 
              rate={rate} 
              baseCurrency={baseCurrency} 
              toCurrency={toCurrency} 
              currencyInput={currencyInput} 
              currencyOutput={currencyOutput} 
            />
          </div>
          <div className="col-8">

          </div>
        </div>
      </div>

    </div>
  )
}

export default InputDialog;