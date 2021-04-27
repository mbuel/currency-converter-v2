import React, {useState, useEffect} from 'react';
import InputDialog from './InputDialog';
import fx from 'money';
import _ from 'lodash';
import currencyFormatter from '../utils/currencyFormatter';
import FilterNum from '../utils/FilterNum';

export default function Container(props) {

  const {currencyList} = props;
  currencyList.rates[currencyList.base] = 1;

  const [rate, setRate] = useState(1);
  const [currencyInput, setCurrencyInput] = useState('$1');
  const [currencyOutput, setCurrencyOutput] = useState('$0');
  const [baseCurrency, setBaseCurrency] = useState(currencyList.base);
  const [toCurrency, setToCurrency] = useState(Object.keys(currencyList.rates)[4]);
  const [toFormatter, setToFormatter] = useState(currencyFormatter(toCurrency));
  const [baseFormatter, setBaseFormatter] = useState(currencyFormatter(baseCurrency));

  useEffect(() => {
    fx.baseCurrency = baseCurrency;
    fx.rates = currencyList.rates;
    fx.settings.from = baseCurrency;
    fx.settings.to = toCurrency;

    setBaseFormatter(currencyFormatter(baseCurrency));
    setToFormatter(currencyFormatter(toCurrency));
  
    setRate(_.ceil((fx(1).from(baseCurrency).to(toCurrency)), 4));
    
    setInput(currencyInput);
    
    let output = FilterNum(currencyInput, currencyInput) * rate;
    setOutput(output);
  }, [baseCurrency]);

  const setOutput = (num) => {
    setCurrencyOutput(toFormatter.format(FilterNum(num, currencyOutput)));
  }
  const setInput = (num) => {
    setCurrencyInput(baseFormatter.format(FilterNum(num, currencyInput)));

  }

  return (
    <React.Fragment>
      <InputDialog 
        currencyList={currencyList} 
        currencyInput={currencyInput} 
        currencyOutput={currencyOutput} 
        updateInput={setInput} 
        updateOutput={setOutput}
        rate={rate}
        baseCurrency={baseCurrency}
        toCurrency={toCurrency}
      />
      {/* TODO: move this to a sub app that controls the currencies and passes them on to appropriate sub-components */}
      {/* <CurrencyList conversionRate={0.84} currencySelected={'USD'} /> */}
    </React.Fragment>
  )
}