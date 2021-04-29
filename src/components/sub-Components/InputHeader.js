import React from 'react';

export default function InputHeader(props) {
  return (
    <React.Fragment>
      <div className="row CurrencySelection">
        <div className="col-12">
          <h2>Convert</h2> 
        </div>
      </div>
      <div className="pt-3 row">
        <div className="col-4">
          <h3>Amount</h3>
        </div>
        <div className="col-4">
          <h2>Base</h2>
        </div>
        <div className="col-4">
          <h2>Transfer</h2>
        </div>
      </div>
    </React.Fragment>
  );
}