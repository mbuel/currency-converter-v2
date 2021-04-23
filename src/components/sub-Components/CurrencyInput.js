import React from 'react';


export default function CurrencyInput(props) {
  const {handler, value} = props;
  
  return (
    <React.Fragment>
      {/* TODO: need state variable to track value and propagate changes to rest of page */}
      <input onChange={handler} class="span2" id="appendedInputButton" size="16" type="text" value={value} />
    </React.Fragment>
  )

}