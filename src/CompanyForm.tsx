import React, { ChangeEvent, useState } from 'react';
import {Button, Form, Input} from 'antd';
import {Rule} from 'antd/lib/form';
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
  const [activeSeatLimit, setActiveSeatLimit] = useState(0);
  const nameRules: Array<Rule> = [
    {
      required: true,
      message: 'This field is required'
    }
  ];
  const totalSeatsRules: Array<Rule> = [
    {
      validator: (_, value: string) => Number(value) > 0 ? Promise.resolve() : Promise.reject(),
      message: 'Cannot have negative seats'
    }
  ]
  const activeSeatsRules: Array<Rule> = [
    {
      validator: (_, value: string) => Number(value) > 0 ? Promise.resolve() : Promise.reject(),
      message: 'Cannot have negative seats'
    },
    {
      validator: (_, value: string) => Number(value) <= activeSeatLimit ? Promise.resolve() : Promise.reject(),
      message: 'Cannot have more active seats than than total seats'
    }
  ];
  const onTotalSeatChange = (e: ChangeEvent) => {
    try {
      const input = e.target as HTMLInputElement;
      const totalSeats = Number(input.value);
      if (!Number.isNaN(totalSeats)) {
        setActiveSeatLimit(totalSeats);
      }
    } catch {}
  }

  const offset = 4;
  const span = 16;
  return (
    <Form labelCol={{span: offset}}
          wrapperCol={{span}}
          name="User login"
          initialValues={{remember: true}}
          onFinish={props.onSubmit}>
      <Item label="Name"
            name="name"
            rules={nameRules}>
        <Input type="text" />
      </Item>
      <Item label="Total Seats"
            name="totalSeats"
            rules={totalSeatsRules}
            getValueFromEvent={onTotalSeatChange}>
        <Input type="number" />
      </Item>
      <Item label="Active Seats"
            name="activeSeats"
            rules={activeSeatsRules}>
        <Input type="number" />
      </Item>
      <Item wrapperCol={{offset, span}}>
        <Button type="primary" htmlType="submit">Submit</Button>
      </Item>
    </Form>
  );
};

export default CompanyForm;
