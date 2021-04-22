import React, {useState, useEffect} from 'react';
import '../css/InputDialog.css';
import CurrencySelection from './sub-Components/CurrencySelection';
import currencySelection from './sub-Components/CurrencySelection';


function InputDialog(props) {
  const {currencyList} = props;
  const [currencyInput, setCurrencyInput] = useState(0);
  const [baseCurrency, setBaseCurrency] = useState('USD');
  const [toCurrency, setToCurrency] = useState('EUR');
  

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
          {/* TODO: need state variable to track value and propagate changes to rest of page */}
          <input></input>
        </div>
        <div className="col-4">

          <div class="input-append btn-group">
            {/* TODO: need change handler for input class */}
            {/* TODO: need to implement a state variable for these inputs to track changes */}
            <input class="span2" id="appendedInputButton" size="16" type="text" value={currencyList.base} />
            <a class="btn btn-dark dropdown-toggle" data-toggle="dropdown" href="#">
                <span class="caret"></span>
            </a>
            {/* TODO: need to position this menu with CSS to be below input */}
            {/* TODO: Needs styling to match page */}
            {/* TODO: Needs to be size limited with a scroll bar */}
            {/* TODO: needs to propagate changes to rest of page */}
            <ul class="dropdown-menu">
              <CurrencySelection currencyList={currencyList} />
            </ul>
          </div>

        </div>
        <div className="col-4">

          <input></input>
        </div>
      </div>
    </div>
  )
}

export default InputDialog;