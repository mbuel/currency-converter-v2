import React, {useState, useEffect} from 'react';
import '../css/InputDialog.css';
import ConversionOutput from './sub-Components/ConversionOutput';
import InputDropDown from './sub-Components/InputDropDown';
import InputHeader from './sub-Components/InputHeader';
import CurrencyInput from './sub-Components/CurrencyInput';
import getFlagIconByCountryCode from '../utils/getFlagIconByCountryCode';
// import fx from 'money';
// import _ from 'lodash';



function InputDialog(props) {


  const {
    currencyList, 
    currencyInput, 
    currencyOutput, 
    baseCurrency, 
    toCurrency, 
    updateInput,
    rate } = props;


  // deal with inputs changing
  const handler = (e) => {
    updateInput(e.target.value);
  }

  return (
    <div className="pt-5 converter container-fluid">
      <InputHeader />
      <div className="row">
        <div className="col-4">
          <CurrencyInput handler={handler} value={currencyInput}/>
        </div>
        <div className="col-4">
          <InputDropDown handler={handler} currencyList={currencyList} id="baseCurrency" value={`${getFlagIconByCountryCode(baseCurrency.substring(0,2))} ${baseCurrency}`}/>
        </div>
        <div className="col-4">
          <InputDropDown handler={handler} currencyList={currencyList} id="transferCurrency" value={`${getFlagIconByCountryCode(toCurrency.substring(0,2))} ${toCurrency}`}/>
        </div>
      </div>
      <div className="row">
        <div className="col-4">
          <ConversionOutput rate={rate} baseCurrency={baseCurrency} toCurrency={toCurrency} currencyInput={currencyInput} currencyOutput={currencyOutput} />
        </div>
        <div className="col-8">

        </div>
      </div>
    </div>
  )
}

export default InputDialog;