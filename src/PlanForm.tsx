import React, { useEffect, useState } from 'react';
// @ts-ignore - Seems to be no types package for this?
import * as CurrencyFormat from 'react-currency-format';
import {Button, Card, Form, Radio, Typography} from 'antd';
import BackendConnector from './BackendConnector';
import { FantasticalEnterprisePlan } from './models/fantastical-enterprise-plan';
const {Item} = Form;
const {Paragraph} = Typography;

export type PlanFormData = {
  planId: number;
};

type PlanFormProps = {
  onSubmit: (formData: PlanFormData) => void;
  disabled?: boolean;
};

const PlanForm = (props: PlanFormProps) => {
  const [plans, setPlans] = useState<Array<FantasticalEnterprisePlan>>([]);
  useEffect(() => {
    BackendConnector.getPlans().then(setPlans);
  }, []);

  const offset = 4;
  const span = 16;
  return (
    <Form wrapperCol={{span, offset: 10}}
          name="User login"
          initialValues={{remember: true}}
          onFinish={props.onSubmit}>
      <Item label=""
            name="planId"
            required
            style={{display: 'flex', justifyContent: 'center'}}>
        <Radio.Group disabled={props.disabled}>
          {plans.map(plan => <PlanOption key={plan.id} plan={plan} />)}
        </Radio.Group>
      </Item>
      <Item wrapperCol={{xs: {offset: 0, span: 24}, md: {offset, span}}}>
        <Button type="primary" htmlType="submit">Submit</Button>
      </Item>
    </Form>
  );
};

const PlanOption = (props: {plan: FantasticalEnterprisePlan}) => {
  // @TODO: Localized currencies
  const monthlyCost = <CurrencyFormat value={props.plan.monthlyPerMonthCost}
                                      displayType="text"
                                      thousandSeparator={true}
                                      decimalScale={2}
                                      fixedDecimalScale={true}
                                      prefix="$" />
  const yearlyCost = <CurrencyFormat value={props.plan.yearlyPerYearCost}
                                      displayType="text"
                                      thousandSeparator={true}
                                      decimalScale={2}
                                      fixedDecimalScale={true}
                                      prefix="$" />
  return (
    <Radio value={props.plan.id}>
      <Card title={props.plan.name} style={{marginTop: '1rem', right: '40%'}}>
        <Paragraph>
          <strong>{monthlyCost}</strong> / month
        </Paragraph>
        <Paragraph>
          <strong>{yearlyCost}</strong> / year
        </Paragraph>
      </Card>
    </Radio>
  );
};

export default PlanForm;
