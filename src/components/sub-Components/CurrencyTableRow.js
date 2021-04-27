import React, {useState, useEffect} from 'react';
import createCurrencyList from '../../utils/createCurrencyList';
import getFlagIconByCountryCode from '../../utils/getFlagIconByCountryCode';

export default function CurrencyTableRow(props) {
  const {currencyList, currencyInput } = props;

  const [currenciesList, setCurrenciesList] = useState([]);

  useEffect(() => {
    if(currencyList.rates) {
      setCurrenciesList(createCurrencyList(currencyList.rates));
    }
    
  }, []);

  return (
      <>
        {currenciesList.map((currency, i) => {
          return (
            <div className='currency-data row'>
              <div className='col-4'>
                {getFlagIconByCountryCode(currency.substring(0,2))} {currency}
              </div>
              <div className='col-4'>
                {currenciesList[currency]}
              </div>
              <div className='col-4'>
                {currencyInput * currenciesList[currency]}
              </div>
            </div>
          )
        })}
      </>
  )
}