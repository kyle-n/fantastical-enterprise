import React from 'react';
import './Home.css';
import hero from './main-hero.png';
import {Typography, Layout} from 'antd';
const {Title, Paragraph} = Typography;
const {Header, Content} = Layout;

const HomePage = () => (
  <Layout style={{background: 'none'}}>
    <Header id="splash-title-container">
      <Title level={1}>Fantastical Enterprise</Title>
    </Header>
    <Content id="splash-content">
      <div>
        <img src={hero} alt="Fantastical running on Mac, iPad, iPhone and Apple Watch" />
      </div>
      <div>
        <Title level={2}>Powerful features for power users.</Title>
        <Title level={3} type="secondary">Help your team work faster with the best calendar and tasks app.</Title>
      </div>
    </Content>
  </Layout>
);

export default HomePage;
