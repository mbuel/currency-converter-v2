import React, {useState, useEffect} from 'react';
import axios from 'axios';
import '../../css/ConversionOutput.css';
import currencyFormatter from '../../utils/currencyFormatter';
import FilterNum from '../../utils/FilterNum';
import getFlagIconByCountryCode from '../../utils/getFlagIconByCountryCode';



function ConversionOutput(props) {
  const {baseCurrency, toCurrency, rate, currencyInput} = props;

  const [baseCurrencyLabel, setBaseCurrencyLabel] = useState('');
  const [toCurrencyLabel, setToCurrencyLabel] = useState('');
  const [currencyOutput, setCurrencyOutput] = useState(undefined);
  
  const api = 'https://altexchangerateapi.herokuapp.com/currencies';
  
  let toFormatter = undefined;
  
  const setOutput = (num) => {
    let output = FilterNum(num, num) * rate;
    
    setCurrencyOutput(toFormatter.format(output));
  }

  
  
  useEffect( () => {
    console.log(toCurrency, currencyInput);
    toFormatter = toCurrency && currencyFormatter(toCurrency);

    toFormatter && setOutput(currencyInput);
    console.log(currencyOutput);

    const loadData = async () => {
      let result = await axios(
        `${api}`
      );

      result = JSON.parse(result.request.responseText);
      setBaseCurrencyLabel(result[baseCurrency]);
      setToCurrencyLabel(result[toCurrency])
    }
    loadData();
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
        <div>Conversion: <span>{currencyOutput}</span></div>

      </div>
    </>

  )
}

export default ConversionOutput;