import React from 'react';
import Bootstrap from 'bootstrap';
import '../css/bootstrap.min.css';
import '../css/currency.css';

function CurrencyList(props) {
  const { conversionRate, currencySelected } = props;

  return (
    <React.Fragment>
      <div className='container-fluid currency list'>
        <div className='row'>
          <div className='col-12'>
            {conversionRate}
          </div>
        </div>
        <div className='row'>
          <div className='col-12'>
            {currencySelected}
          </div>
        </div>
        <div className='row'>
          <div className='col-12'>
            {currencySelected}
          </div>
        </div>
      </div>
    </React.Fragment>
  )
}

export default CurrencyList;