import React from 'react';
import {Button, Form, Input} from 'antd';
import {Rule} from 'antd/lib/form';
const {Item} = Form;

export type UserFormData = {
  email: string;
  password: string;
};

type UserFormProps = {
  onSubmit: (formData: UserFormData) => void;
};

const UserForm = (props: UserFormProps) => {
  const emailRules: Array<Rule> = [
    {
      required: true,
      message: 'This field is required'
    }
  ];
  const passwordRules: Array<Rule> = [
    {
      required: true,
      message: 'This field is required'
    },
    {
      min: 8,
      message: 'Must be at least 8 characters'
    },
    {
      pattern: /\d/g,
      message: 'Must have at least one number'
    }
  ];

  const offset = 4;
  const span = 16;
  return (
    <Form labelCol={{span: offset}}
          wrapperCol={{span}}
          name="User login"
          initialValues={{remember: true}}
          onFinish={props.onSubmit}>
      <Item label="Email"
            name="email"
            rules={emailRules}>
        <Input type="email" />
      </Item>
      <Item label="Password"
            name="password"
            rules={passwordRules}>
        <Input.Password />
      </Item>
      <Item wrapperCol={{xs: {offset: 0, span: 24}, md: {offset, span}}}>
        <Button type="primary" htmlType="submit">Submit</Button>
      </Item>
    </Form>
  );
};

export default UserForm;
