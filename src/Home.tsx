import React from 'react';
import './Home.css';
import hero from './main-hero.png';
import {Typography, Layout} from 'antd';
import { SignupButtonLink } from './Header';
const {Title, Paragraph} = Typography;
const {Header, Content} = Layout;

const HomePage = () => (
  <Layout style={{background: 'none'}}>
    <Header id="splash-title-container">
      <Title level={1} style={{textAlign: 'center'}}>Fantastical Enterprise</Title>
    </Header>
    <Content id="splash-content">
      <div className="solo-text">
        <img src={hero} alt="Fantastical running on Mac, iPad, iPhone and Apple Watch" />
      </div>
      <div className="solo-text">
        <Title level={2}>Powerful features for power users.</Title>
        <Title level={3} type="secondary">Help your team work faster with the best calendar and tasks app.</Title>
      </div>
      <div className="solo-text">
        <SignupButtonLink large />
      </div>
      <div id="splash-paragraph-container">
        <Paragraph>
          Fantastical is packed with amazing features, like finding meeting times that work for everyone.
        </Paragraph>
        <Paragraph>
          Sign your whole team up instantly. No waiting, no sales teams, just instant productivity. 
        </Paragraph>
      </div>
    </Content>
  </Layout>
);

export default HomePage;
