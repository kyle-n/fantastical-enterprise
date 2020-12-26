import React from 'react';
import UserForm, {UserFormData} from './UserForm';
import {Col, Row, Typography} from 'antd';
const {Title, Paragraph} = Typography;

const SignupPage = () => {
  const onSignup = (formData: UserFormData) => {
    console.log(formData);
  };

  return (
    <>
      <section>
        <Row>
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
