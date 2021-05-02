import React from 'react';
import FontAwesomeIcon from '../utils/getFontIcon';
import { faLinkedin, faGithubAlt} from "@fortawesome/free-brands-svg-icons"
import '../css/footer.css';

export default function Footer() {
  return (
    <React.Fragment>
      <footer className="inline-flex">
        {/* <!-- Setup personal copyright information here --> */}
        <a href="mailto:mbuel@tutanota.com" target="_blank" rel="noreferrer">
          <FontAwesomeIcon icon={["fas", "envelope"]} size="1x" color="#0366d6" /> Morris Buel
          </a>  &nbsp;| 
          &nbsp;<FontAwesomeIcon icon={["fas", "copyright"]} size="1x" color="#0366d6" /> {new Date().getFullYear()} | 
          <a href="https://github.com/mbuel" target="_blank" rel="noreferrer">
          &nbsp;<FontAwesomeIcon icon={faGithubAlt} size="1x" color="#0366d6" /> GitHub</a> &nbsp;| 
          <a href="https://www.linkedin.com/in/morris-buel-b9a0a21a8/" target="_blank" rel="noreferrer">
          &nbsp;<FontAwesomeIcon icon={faLinkedin} size="1x" color="#0366d6" /> LinkedIn</a> &nbsp;| 
          <a href="https://mbuel.netlify.app/" target="_blank" rel="noreferrer">
          &nbsp;<FontAwesomeIcon icon={["fas", "user"]} size="1x" color="#0366d6" /> Portfolio</a>
      </footer>
    </React.Fragment>
  )
}