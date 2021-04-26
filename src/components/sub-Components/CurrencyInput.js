import React from 'react';


export default function CurrencyInput(props) {
  const {handler, value} = props;
  
  return (
    <React.Fragment>
      {/* TODO: need state variable to track value and propagate changes to rest of page */}
        <input 
          type="text"
          placeholder="0.00" 
          onChange={handler} 
          class="span2" 
          size="16" 
          value={value} 
        />
    </React.Fragment>
  )

}