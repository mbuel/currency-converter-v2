import React from 'react';
import '../css/footer.css';

export default function Footer() {
  return (
    <React.Fragment>
      <footer className="inline-flex">
        {/* <!-- Setup personal copyright information here --> */}
        <a href="mailto:mbuel@tutanota.com" target="_blank" rel="noreferrer">Morris Buel</a> &copy; {new Date().getFullYear()} | <a href="https://github.com/mbuel">GitHub</a> | <a href="https://www.linkedin.com/in/morris-buel-b9a0a21a8/">LinkedIn</a> | <a href="https://mbuel.netlify.app/" target="_blank">Portfolio</a>
      </footer>
    </React.Fragment>
  )
}