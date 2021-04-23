import React, {useState, useEffect} from 'react';
import '../css/InputDialog.css';
import CurrencySelection from './sub-Components/CurrencySelection';
import InputDropDown from './sub-Components/InputDropDown';
import InputHeader from './sub-Components/InputHeader';
import CurrencyInput from './sub-Components/CurrencyInput';



function InputDialog(props) {
  const {currencyList} = props;
  const [currencyInput, setCurrencyInput] = useState(0);
  const [baseCurrency, setBaseCurrency] = useState('USD');
  const [toCurrency, setToCurrency] = useState('EUR');
  
  const handler = (e) => {
    console.log(e);
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
          <InputDropDown handler={handler} currencyList={currencyList} id="baseCurrency"/>
        </div>
        <div className="col-4">
          <InputDropDown handler={handler} currencyList={currencyList} id="transferCurrency"/>
        </div>
      </div>
    </div>
  )
}

export default InputDialog;