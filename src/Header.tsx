import React from 'react';
import {Link} from 'react-router-dom';
import { Button, Row, Col } from 'antd';
import logo from './flexibits.svg';
import './Header.css';

const Header = () => (
  <header>
    <Row>
      <Col span={8}>
        <img src={logo} alt="Flexibits Logo" />
      </Col>
      <Col span={8} className="header-links">
        <a href="https://flexibits.com/" title="Flexibits apps">Apps</a> 
        <a href="https://flexibits.com/support" title="Get support">Support</a> 
        <a href="https://flexibits.com/about" title="About Flexibits">About</a> 
        <a href="https://flexibits.com/blog" title="Flexibits blog">Blog</a>
      </Col>
      <Col span={8} id="account-link-container">
        <Link to="/login" title="Log in">Sign In</Link>
        <Link to="/signup" title="Sign up">
          <Button type="link" id="signup-button">Try for Free</Button>
        </Link>
      </Col>
    </Row>
  </header>
);

export default Header;
