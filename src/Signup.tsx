import React from 'react';
import UserForm, {UserFormData} from './UserForm';
import {Typography} from 'antd';
const {Title} = Typography;

const SignupPage = () => {
  const onSignup = (formData: UserFormData) => {
    console.log(formData);
  };

  return (
    <>
      <section>
        <Title className="" level={2}>Sign Up</Title>
      </section>
      <section>
        <UserForm onSubmit={onSignup} />
      </section>
    </>
  );
};

export default SignupPage;
