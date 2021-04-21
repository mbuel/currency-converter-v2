import React, {useState, useEffect} from 'react';
import '../css/InputDialog.css';

function InputDialog(props) {
  const {currencyList} = props;
  const [currencyInput, setCurrencyInput] = useState(0);
  const [baseCurrency, setBaseCurrency] = useState('USD');
  const [toCurrency, setToCurrency] = useState('EUR');
  const [currenciesList, setCurrenciesList] = useState([]);

useEffect(() => {
  setCurrenciesList(createCurrencyList(currencyList.rates));
}, []);

  const createCurrencyList = (data) => {
    return Object.keys(data);
  }
  let dataSet = <p>empty array</p>;
  if (currenciesList) {
    dataSet = currenciesList.map((el, i) => {
      return (
        <div className="row">
          <div className="col-12">
            <h5>{el}</h5> 
          </div>
      </div>
      );
    });
  }
  // initCurrencyList();

  return (
    <div className="pt-5 converter container-fluid">
      <div className="row">
        <div className="col-12">
          <h2>Convert</h2> 
        </div>
      </div>
      <div className="pt-3 row">
        <div className="col-4">
          <h3>Amount</h3>
        </div>
        <div className="col-4">
          <h3>Base</h3>
        </div>
        <div className="col-4">
          <h3>Transfer</h3>
        </div>
      </div>
      <div className="row">
        <div className="col-4">

          <input id="amt" className=""></input>
        </div>
        <div className="col-4">

          <input></input>
        </div>
        <div className="col-4">

          <input></input>
        </div>
      </div>
      {dataSet}
    </div>
  )
}

export default InputDialog;