import React, {useState, useEffect} from 'react';
import createCurrencyList from '../../utils/createCurrencyList';
import getFlagIconByCountryCode from '../../utils/getFlagIconByCountryCode';
import FilterNum from '../../utils/FilterNum';

export default function CurrencyTableRow(props) {
  const {currencyList, currencyInput } = props;

  const [currenciesList, setCurrenciesList] = useState([]);

  useEffect(() => {
    if(currencyList.rates) {
      setCurrenciesList(createCurrencyList(currencyList.rates));
    }
    
  }, []);
  console.log(currencyInput);
  return (
      <>
        {currenciesList.map((currency, i) => {
          return (
            <div className='currency-data row'>
              <div className='col-4'>
                {getFlagIconByCountryCode(currency.substring(0,2))} {currency}
              </div>
              <div className='col-4'>
                {currencyList.rates[currency]}
              </div>
              <div className='col-4'>
                {FilterNum(currencyInput) * currencyList.rates[currency]}
              </div>
            </div>
          )
        })}
      </>
  )
}