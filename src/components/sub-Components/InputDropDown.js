import '../../css/InputDropDown.css';
import React from 'react';
import CurrencySelection from './CurrencySelection';
import {library} from '@fortawesome/fontawesome-svg-core';
import {fas} from '@fortawesome/free-solid-svg-icons';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';

export default function InputDropDown(props) {
  const {currencyList, id, value} = props;
  library.add(fas);
  const handler = (e) => {
    console.log(e);
  }

  return (
    <React.Fragment>
    {/* <div id={id} class="input-append btn-group"> */}
      {/* TODO: need change handler for input class */}
      {/* TODO: need to implement a state variable for these inputs to track changes */}
      {/* TODO: to and from have same value */}
      <input onChange={handler} class="span2 input-append btn-group" id={`${id}-appendedInputButton`} size="16" type="text" value={value} />
      <a id={`${id}-dropper`} class="btn btn-dark-outline dropdown-toggle" data-toggle="dropdown" href="#">
          <FontAwesomeIcon icon={["fas", "caret-down"]} size="2x" color="rgb(22, 161, 131)"/>
      </a>
      {/* TODO: need to position this menu with CSS to be below input */}
      {/* TODO: Needs styling to match page */}
      {/* TODO: Needs to be size limited with a scroll bar */}
      {/* TODO: needs to propagate changes to rest of page */}
      {/* TODO: search filter */}
      <ul class="dropdown-menu">
        <div class="drop-container">
          <CurrencySelection currencyList={currencyList} />
        </div>
      </ul>
    {/* </div> */}
    </React.Fragment>
  );
}
