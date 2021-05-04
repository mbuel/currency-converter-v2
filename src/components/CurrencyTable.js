import React, { useState } from 'react';
import Bootstrap from 'bootstrap';
import CurrencyTableHeader from './sub-Components/CurrencyTableHeader';
import CurrencyTableRow from './sub-Components/CurrencyTableRow';
import '../css/bootstrap.min.css';
import '../css/CurrencyTable.css';
import TabContainer from './sub-Components/TabContainer';
import LoadingInput from './LoadingInput';
import { render } from '@testing-library/react';

function CurrencyTable(props) {
  const { currencyList, currencyInput } = props;
  const [currentTab, setCurrentTab] = useState('CHART');

  const setTab = (tab) => {
    setCurrentTab(tab);
  }
  let content = <LoadingInput />;
  if (currentTab === 'CHART') {
    content = (
      <React.Fragment>
        {/* <div className='currency-table container-fluid'> */}
          <CurrencyTableHeader />
          <div className="currency-list">
            <CurrencyTableRow currencyList={currencyList} currencyInput={currencyInput} />
          </div>
        {/* </div> */}
      </React.Fragment>
    );
  }

  if (currentTab === 'GRAPH') {
    content = (
      <React.Fragment>
        <div>
          graph will go here.
        </div>
      </React.Fragment>
    )
  }

  return (
      <React.Fragment>

        <TabContainer toggleTab={setTab} />
        <div className='currency-table container-fluid'>
          {content}
        </div>

      </React.Fragment>
  )
}

export default CurrencyTable;