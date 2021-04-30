import React, {useState, useEffect} from 'react';
import axios from 'axios';
import '../../css/ConversionOutput.css';

import getFlagIconByCountryCode from '../../utils/getFlagIconByCountryCode';



function ConversionOutput(props) {
  const {baseCurrency, toCurrency, rate, currencyInput, currencyOutput} = props;

  const [baseCurrencyLabel, setBaseCurrencyLabel] = useState('');
  const [toCurrencyLabel, setToCurrencyLabel] = useState('');

  const api = 'https://altexchangerateapi.herokuapp.com/currencies'

  useEffect( () => {
    const loadData = async () => {
      let result = await axios(
        `${api}`
      );

      result = JSON.parse(result.request.responseText);
      setBaseCurrencyLabel(result[baseCurrency]);
      setToCurrencyLabel(result[toCurrency])
    }
    loadData();
  }, [baseCurrency]);

  // TODO: needs fixed positioning
  // TODO: move to corner more
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