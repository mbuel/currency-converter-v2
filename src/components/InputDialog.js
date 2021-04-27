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
    rate,
    updateOutput,
    baseCurrencyFormatter, 
    toCurrencyFormatter } = props;
  // currencyList.rates[currencyList.base] = 1;
  // const [rate, setRate] = useState(1);
  // const [currencyInput, setCurrencyInput] = useState('$1');
  // const [currencyOutput, setCurrencyOutput] = useState('$0');
  // const [baseCurrency, setBaseCurrency] = useState(currencyList.base);
  // const [toCurrency, setToCurrency] = useState(Object.keys(currencyList.rates)[4]);

  // const [baseFormatter, setBaseFormatter] = useState(new Intl.NumberFormat('en-US', {
  //     style: 'currency',
  //     currency: baseCurrency,
  //     minimumFractionDigits: 2
  //   }
  // ));

//   const [toFormatter, setToFormatter] = useState(new Intl.NumberFormat('en-US', {
//     style: 'currency',
//     currency: toCurrency,
//     minimumFractionDigits: 2
//   }
// ));

// useEffect(() => {
//   fx.baseCurrency = baseCurrency;
//   fx.rates = currencyList.rates;
//   fx.settings.from = baseCurrency;
//   fx.settings.to = toCurrency;

//   setInput(currencyInput);

//   setRate(_.ceil((fx(1).from(baseCurrency).to(toCurrency)), 4));
  
//   // console.log(rate.toFixed(2));
//   let output = filterNum(currencyInput) * rate;
//   setOutput(output);
// }, []);

  // const setOutput = (num) => {
  //   setCurrencyOutput(
  //     toFormatter.format(
  //       _.ceil(filterNum(num),2))
  //   );
  // }
  // const setInput = (num) => {
  //   setCurrencyInput(
  //     baseFormatter.format(
  //       _.ceil(filterNum(num),2))
  //   );

  // }

  // const filterNum = (num) => {
  //   console.warn(num, typeof num);

  //   num = typeof num === 'string' && num.indexOf('$') >= 0 ? num.split('$')[1] : num;
  //   console.warn(num, typeof num);
  //   num = isNaN(num) ? currencyInput.split('$')[1] : num;
  //   console.warn(num, typeof num);
  //   console.warn(num);

  //   return num;

  // }


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