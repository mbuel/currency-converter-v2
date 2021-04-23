import React, {useEffect, useState} from 'react';
import createCurrencyList from '../../utils/createCurrencyList';
import getFlagIconByCountryCode from '../../utils/getFlagIconByCountryCode';


export default function CurrencySelection(props) {
  const {currencyList} = props;
  const [currenciesList, setCurrenciesList] = useState([]);

  let dataSet = <p>empty array</p>;
  useEffect(() => {
    if(currencyList.rates) {
      setCurrenciesList(createCurrencyList(currencyList.rates));
    }
    
  }, []);

  if (currenciesList) {
    dataSet = currenciesList.map((el, i) => {
      return (
          <li class="text-center"><a href="#">{getFlagIconByCountryCode(el.substring(0,2))} {el}</a></li>
      );
    });
  }

  return (
      <React.Fragment>
        {dataSet}
      </React.Fragment>
    ) 
    
}

