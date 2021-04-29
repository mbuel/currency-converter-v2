import React from 'react';
import getFlagIconByCountryCode from '../../utils/getFlagIconByCountryCode';


export default function CurrencySelection(props) {
  const {currencyListKeys} = props;
  
  let dataSet = <p>empty array</p>;

  if (currencyListKeys) {
    dataSet = currencyListKeys.map((el, i) => {
      return (
          <li class="text-center"><span>{getFlagIconByCountryCode(el)}</span> {el}</li>
      );
    });
  }

  return (
      <React.Fragment>
        {dataSet}
      </React.Fragment>
    ) 
    
}

