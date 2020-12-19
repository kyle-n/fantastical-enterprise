import React from 'react';
import logo from './flexibits.svg';

const footerLayout = {
  textAlign: 'center' as 'center',
  color: 'gray'
};

const Footer = () => (
  <footer style={footerLayout}>
    <div>
      <img src={logo} style={{filter: 'grayscale(100%)'}} alt="Flexibits logo" />
    </div>
    <div>
      Copyright &#169; 2020 Kyle Nazario
    </div>
  </footer>
);

export default Footer;
