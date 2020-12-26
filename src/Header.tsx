import React from 'react';
import {Link} from 'react-router-dom';
import { Button, Divider, Row, Col } from 'antd';
import logo from './flexibits.svg';
import './Header.css';

const Header = () => (
  <header>
    <Row>
      <Col xs={24} md={8}>
        <Link to="/" title="Home">
          <img src={logo} id="logo" alt="Flexibits Logo" />
        </Link>
      </Col>
      <Col xs={24} md={8} className="header-links">
        <a href="https://flexibits.com/" title="Flexibits apps">Apps</a> 
        <a href="https://flexibits.com/support" title="Get support">Support</a> 
        <a href="https://flexibits.com/about" title="About Flexibits">About</a> 
        <a href="https://flexibits.com/blog" title="Flexibits blog">Blog</a>
      </Col>
      <Col xs={24} md={8} id="account-link-container">
        <Link to="/login" title="Log in">Sign In</Link>
        <SignupButtonLink />
      </Col>
    </Row>
    <Divider />
  </header>
);

export const SignupButtonLink = (props?: {large?: boolean}) => {
  const buttonStyle = props?.large ? {fontSize: '2rem'} : {};
  return (
    <Link to="/signup" title="Sign up">
      <Button type="link" id="signup-button" style={buttonStyle}>Try for Free</Button>
    </Link>
  );
}

export default Header;
