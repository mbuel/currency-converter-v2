import React, {useState, useEffect} from 'react';
import '../css/InputDialog.css';
import CurrencySelection from './sub-Components/CurrencySelection';
import InputDropDown from './sub-Components/InputDropDown';
import InputHeader from './sub-Components/InputHeader';
import CurrencyInput from './sub-Components/CurrencyInput';
import getFlagIconByCountryCode from '../utils/getFlagIconByCountryCode';



function InputDialog(props) {
  const {currencyList} = props;
  const [currencyInput, setCurrencyInput] = useState(0);
  const [baseCurrency, setBaseCurrency] = useState('USD');
  const [toCurrency, setToCurrency] = useState('EUR');
  
  // deal with inputs changing
  const handler = (e) => {
    console.log(e);
    // Numerous bugs:
    // BUG: 0 remains leading character.
    // BUG: backspace is printing as null.
    // BUG: accepting characters other than numbers
    setCurrencyInput(currencyInput + e.nativeEvent.data);
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
    </div>
  )
}

export default InputDialog;