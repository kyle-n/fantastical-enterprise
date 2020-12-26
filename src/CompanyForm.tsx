import React from 'react';
import {Button, Form, Input} from 'antd';
const {Item} = Form;

export type CompanyFormData = {
  name: string;
  totalSeats: number;
  activeSeats: number;
};

type CompanyFormProps = {
  onSubmit: (formData: CompanyFormData) => void;
};

const CompanyForm = (props: CompanyFormProps) => {
  const offset = 4;
  const span = 16;
  // @TODO: Custom validation so user can't have activeSeats > totalSeats
  return (
    <Form labelCol={{span: offset}}
          wrapperCol={{span}}
          name="User login"
          initialValues={{remember: true}}
          onFinish={props.onSubmit}>
      <Item label="Name"
            name="name"
            required>
        <Input type="text" />
      </Item>
      <Item label="Total Seats"
            name="totalSeats"
            required>
        <Input type="number" />
      </Item>
      <Item label="Active Seats"
            name="activeSeats"
            required>
        <Input type="number" />
      </Item>
      <Item wrapperCol={{offset, span}}>
        <Button type="primary" htmlType="submit">Submit</Button>
      </Item>
    </Form>
  );
};

export default CompanyForm;
