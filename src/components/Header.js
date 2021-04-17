import React from 'react';
import reactDom from 'react-dom';
import '../css/App.css';


function Header(props) {
  const {application, links} = props;

  return (
    <React.Fragment>
      <header className="App-header">
        <p>
          {application} and {links}
        </p>
        <p>
          This will be awesome when completed!
        </p>

      </header>
    </React.Fragment>
  );

}

export default Header;
