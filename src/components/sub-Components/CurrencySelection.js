import React, {useEffect, useState} from 'react';
import { hasFlag, countries } from 'country-flag-icons';
import createCurrencyList from '../../utils/createCurrencyList';
import getUnicodeFlagIcon from 'country-flag-icons/unicode'
import { data } from 'jquery';


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
          <li class="text-center"><a href="#">{getUnicodeFlagIcon(el.substring(0,2).toUpperCase())} {el}</a></li>
      );
    });
  }

  return (
      <React.Fragment>
        {dataSet}
      </React.Fragment>
    ) 
    
}

