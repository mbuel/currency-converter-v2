import '../../css/InputDropDown.css';
import React from 'react';
import CurrencySelection from './CurrencySelection';


export default function InputDropDown(props) {
  const {currencyList, id} = props;

  const handler = (e) => {
    console.log(e);
  }

  return (
    <div id={id} class="input-append btn-group">
      {/* TODO: need change handler for input class */}
      {/* TODO: need to implement a state variable for these inputs to track changes */}
      {/* TODO: to and from have same value */}
      <input onChange={handler} class="span2" id="appendedInputButton" size="16" type="text" value={currencyList.base} />
      <a id="dropper" class="btn btn-dark-outline dropdown-toggle" data-toggle="dropdown" href="#">
          <span class="caret"></span>
      </a>
      {/* TODO: need to position this menu with CSS to be below input */}
      {/* TODO: Needs styling to match page */}
      {/* TODO: Needs to be size limited with a scroll bar */}
      {/* TODO: needs to propagate changes to rest of page */}
      {/* TODO: search filter */}
      <ul class="dropdown-menu">
        <CurrencySelection currencyList={currencyList} />
      </ul>
    </div>
  );
}
