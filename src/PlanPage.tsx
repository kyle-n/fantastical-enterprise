import React, { useContext, useState } from 'react';
// @ts-ignore
import * as CurrencyFormat from 'react-currency-format';
import {GlobalStateContext} from './App';
import CompanyForm, {CompanyFormData} from './CompanyForm';
import PlanForm, {PlanFormData} from './PlanForm';
import './PlanPage.css';
import { Company } from './models/company';
import BackendConnector from './BackendConnector';
import {Col, Divider, Row, Typography} from 'antd';
import { FantasticalEnterprisePlan } from './models/fantastical-enterprise-plan';
const {Title, Paragraph} = Typography;

const mockPlan = new FantasticalEnterprisePlan({
  id: 1,
  name: 'Test Plan',
  monthlyPerMonthCost: 3.45,
  yearlyPerMonthCost: 1.23
});
const mockCompany = new Company({
  id: 3,
  name: 'Flexibits',
  planAdministratorId: 1,
  planId: 1,
  totalSeats: 10,
  activeSeats: 3,
  userIds: []
});

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
      const companyFormData = globalState.company.toJson();
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
      {/* <CompanySection company={globalState.company} onCreateCompany={setCompany} />
      <Divider />
      <PlanSection currentPlan={currentPlan}
                   onUpsertPlan={setPlan}
                   hasCompany={Boolean(globalState.company?.id)} /> */}
      {/* {globalState.company && currentPlan ? (
        <>
          <Divider />
          <OptimizationSection plan={currentPlan} company={globalState.company} />
        </>
      ) : null} */}
      <CompanySection company={mockCompany} onCreateCompany={() => {}} />
      <Divider />
      <PlanSection currentPlan={mockPlan} onUpsertPlan={() => {}} hasCompany={true} />
      <Divider />
      <OptimizationSection plan={mockPlan} company={mockCompany} />
    </>
  );
};

type OptimizationSectionProps = {
  plan: FantasticalEnterprisePlan;
  company: Company;
};

const OptimizationSection = (props: OptimizationSectionProps) => {
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
    <section className="details-section">
      <Paragraph>
        Your current bill is {monthlyCost} per month and {yearlyCost} per year.
      </Paragraph>
      <Paragraph>
        You are currently paying for {props.company.availableSeats} unused seats.
      </Paragraph>
    </section>
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

const DetailLabel = (props: {children: string | number}) => (
  <Col span={4}><strong>{props.children}</strong></Col>
);
const DetailContent = (props: {children: string | number}) => (
  <Col span={20}>{props.children}</Col>
);

const PlanDetails = (props: {plan: FantasticalEnterprisePlan}) => (
  <section id="plan-details" className="details-section">
    <Row>
      <Title level={2}>Plan</Title>
    </Row>
    <Row>
      <DetailLabel>Name</DetailLabel>
      <DetailContent>{props.plan.name}</DetailContent>

      <DetailLabel>Cost Per Month</DetailLabel>
      <DetailContent>{props.plan.monthlyPerMonthCost}</DetailContent>

      <DetailLabel>Cost Per Year</DetailLabel>
      <DetailContent>{props.plan.yearlyPerYearCost}</DetailContent>
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
  <section id="company-details" className="details-section">
    <Row>
      <Title level={2}>Company</Title>
    </Row>
    <Row>
      <DetailLabel>Name</DetailLabel>
      <DetailContent>{props.company.name}</DetailContent>

      <DetailLabel>Total Seats</DetailLabel>
      <DetailContent>{props.company.totalSeats}</DetailContent>

      <DetailLabel>Active Seats</DetailLabel>
      <DetailContent>{props.company.activeSeats}</DetailContent>

      <DetailLabel>Available Seats</DetailLabel>
      <DetailContent>{props.company.availableSeats}</DetailContent>
    </Row>
  </section>
);

export default PlanPage;
