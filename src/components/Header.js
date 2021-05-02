import React from 'react';
import '../css/Header.css';


function Header(props) {
  const {application, links} = props;

  return (
    <React.Fragment>
      <header className="App-header">
        <h1>{application}</h1>
      </header>
    </React.Fragment>
  );

}

export default Header;
