import React from 'react';
import Bootstrap from 'bootstrap';
import CurrencyTableHeader from './sub-Components/CurrencyTableHeader';
import CurrencyTableRow from './sub-Components/CurrencyTableRow';
import '../css/bootstrap.min.css';
import '../css/CurrencyTable.css';

function CurrencyTable(props) {
  const { currencyList, currencyInput } = props;
  
  return (
      <div className='currency-table container-fluid'>
        <CurrencyTableHeader />
        <div className="currency-list">
          <CurrencyTableRow currencyList={currencyList} currencyInput={currencyInput} />
        </div>
      </div>
  )
}

export default CurrencyTable;