import React, {useState, useEffect, useRef} from 'react';
// import axios from 'axios';
import LoadData from '../../utils/LoadData';
import '../../css/ConversionOutput.css';
import currencyFormatter from '../../utils/currencyFormatter';
import FilterNum from '../../utils/FilterNum';



function ConversionOutput(props) {
  const {baseCurrency, toCurrency, rate, currencyInput} = props;

  const [baseCurrencyLabel, setBaseCurrencyLabel] = useState('');
  const [toCurrencyLabel, setToCurrencyLabel] = useState('');
  const [currencyOutput, setCurrencyOutput] = useState(undefined);
  const [toFormatter, setToFormatter] = useState();
  
  const api = 'https://altexchangerateapi.herokuapp.com/currencies';
  
  const setOutput = (num) => {
    let output = FilterNum(num, num) * rate;
    
    setCurrencyOutput(toFormatter.format(output));
  }

  const initLabels = (result) => {
    setBaseCurrencyLabel(result[baseCurrency]);
    setToCurrencyLabel(result[toCurrency])
  }
  
  useEffect( () => {
    setToFormatter(toCurrency && currencyFormatter(toCurrency));

    toFormatter && setOutput(currencyInput);

    LoadData(api, initLabels);
  }, [baseCurrency, toCurrency, currencyInput]);

  // FIXED: needs fixed positioning
  // FIXED: move to corner more
  return (
    <>
      <div className="converted-output">
        <h2>From: {baseCurrency} - {baseCurrencyLabel}</h2>
        <div>Input: <span>{currencyInput}</span></div>
        <div>Rate: <span>{rate}</span></div>
        <div>To: {toCurrency} - {toCurrencyLabel}</div>
        {/* BUG: This is not correctly displaying values */}
        <div>Conversion: <span>{currencyOutput}</span></div>

      </div>
    </>

  )
}

export default ConversionOutput;