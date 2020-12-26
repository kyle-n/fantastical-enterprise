import React, { useContext, useState } from 'react';
import {GlobalStateContext} from './App';
import CompanyForm, {CompanyFormData} from './CompanyForm';
import PlanForm, {PlanFormData} from './PlanForm';
import { Company } from './models/company';
import BackendConnector from './BackendConnector';
import {Col, Divider, Row, Typography} from 'antd';
import { FantasticalEnterprisePlan } from './models/fantastical-enterprise-plan';
const {Title, Paragraph} = Typography;

const PlanPage = () => {
  const [globalState, setGlobalState] = useContext(GlobalStateContext);
  const [currentPlan, setCurrentPlan] = useState<FantasticalEnterprisePlan | undefined>(undefined);
  const setCompany = (formData: CompanyFormData) => {
    BackendConnector.createCompany(formData, globalState.user!.id).then(newCompany => {
      setGlobalState(() => ({...globalState, company: newCompany}));
    });
  };
  const setPlan = (formData: PlanFormData) => {
    if (globalState.company?.id) {
      const companyFormData: any = globalState.company.toJson();
      companyFormData.planId = formData.planId;
      BackendConnector.updateCompany(globalState.company.id, companyFormData)
        .then(company => {
          setGlobalState(() => ({...globalState, company}));
          return BackendConnector.getPlan(company.planId);
        }).then(setCurrentPlan);
    }
  };

  return (
    <>
      <CompanySection company={globalState.company} onCreateCompany={setCompany} />
      <Divider />
      <PlanSection currentPlan={currentPlan}
                   onUpsertPlan={setPlan}
                   hasCompany={Boolean(globalState.company?.id)} />
    </>
  );
};

type PlanSectionProps = {
  currentPlan: FantasticalEnterprisePlan | undefined;
  hasCompany: boolean;
  onUpsertPlan: (formData: PlanFormData) => void;
};

const PlanSection = (props: PlanSectionProps) => {
  return props.currentPlan ? (
    <PlanDetails plan={props.currentPlan} />
  ) : (
    <section style={{opacity: props.hasCompany ? 1 : 0.5}}>
      <Row>
        {/* @TODO: Reusable page title component */}
        <Col span={20} offset={4}>
          <Title className="" level={2}>Select a Plan</Title>
        </Col>
      </Row>
      <PlanForm onSubmit={props.onUpsertPlan} disabled={!props.hasCompany} />
    </section>
  )
};

const PlanDetails = (props: {plan: FantasticalEnterprisePlan}) => (
  <section id="plan-details">
    <Row>
      <Col span={4}>Name</Col>
      <Col span={20}>{props.plan.name}</Col>

      <Col span={4}>Cost Per Month</Col>
      <Col span={20}>{props.plan.monthlyPerMonthCost}</Col>

      <Col span={4}>Cost Per Year</Col>
      <Col span={20}>{props.plan.yearlyPerYearCost}</Col>
    </Row>
  </section>
);

type CompanySectionProps = {
  company: Company | null;
  onCreateCompany: (formData: CompanyFormData) => void;
};

const CompanySection = (props: CompanySectionProps) => {
  return props.company ? (
    <CompanyDetails company={props.company} />
  ) : (
    <section>
      <Row>
        {/* @TODO: Reusable page title component */}
        <Col span={20} offset={4}>
          <Title className="" level={2}>Create Company</Title>
          <Paragraph>
            You must create a company in order to select a plan.
          </Paragraph>
        </Col>
      </Row>
      <CompanyForm onSubmit={props.onCreateCompany} />
    </section>
  );
};

type CompanyDetailsProps = {
  company: Company;
};

const CompanyDetails = (props: CompanyDetailsProps) => (
  <section id="company-details">
    <Row>
      <Col span={4}>Name</Col>
      <Col span={20}>{props.company.name}</Col>

      <Col span={4}>Total Seats</Col>
      <Col span={20}>{props.company.totalSeats}</Col>

      <Col span={4}>Active Seats</Col>
      <Col span={20}>{props.company.activeSeats}</Col>

      <Col span={4}>Available Seats</Col>
      <Col span={20}>{props.company.availableSeats}</Col>
    </Row>
  </section>
);

export default PlanPage;
