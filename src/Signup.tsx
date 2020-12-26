import React from 'react';
import BackendConnector from './BackendConnector';
import UserForm, {UserFormData} from './UserForm';
import {Col, Row, Typography} from 'antd';
const {Title, Paragraph} = Typography;

const SignupPage = () => {
  const onSignup = (formData: UserFormData) => {
    BackendConnector.signup(formData).then(console.log)
  };

  return (
    <>
      <section>
        <Row>
          {/* @TODO: Reusable page title component */}
          <Col span={20} offset={4}>
            <Title className="" level={2}>Sign Up</Title>
            <Paragraph>
              Passwords must have at least 8 characters and 1 number.
            </Paragraph>
          </Col>
        </Row>
      </section>
      <section>
        <UserForm onSubmit={onSignup} />
      </section>
    </>
  );
};

export default SignupPage;
