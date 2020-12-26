import React, { useContext } from 'react';
import {GlobalStateContext} from './App';
import CompanyForm, {CompanyFormData} from './CompanyForm';
import PlanForm, {PlanFormData} from './PlanForm';
import { Company } from './models/company';
import BackendConnector from './BackendConnector';
import {Col, Divider, Row, Typography} from 'antd';
const {Title, Paragraph} = Typography;

const PlanPage = () => {
  const [globalState, setGlobalState] = useContext(GlobalStateContext);
  const setCompany = (formData: CompanyFormData) => {
    BackendConnector.createCompany(formData, globalState.user!.id).then(newCompany => {
      setGlobalState(() => ({...globalState, company: newCompany}));
    });
  };
  const setPlan = (formData: PlanFormData) => {
    if (globalState.company?.id) {
      const companyFormData: any = globalState.company.toJson();
      companyFormData.planId = formData.planId;
      BackendConnector.updateCompany(globalState.company.id, companyFormData).then(company => {
        setGlobalState(() => ({...globalState, company}));
      });
    }
  };

  return (
    <>
      <CompanySection company={globalState.company} onCreateCompany={setCompany} />
      <Divider />
      <PlanSection planId={globalState.company?.planId}
                   onUpsertPlan={setPlan}
                   hasCompany={Boolean(globalState.company?.id)} />
    </>
  );
};

type PlanSectionProps = {
  planId: number | undefined;
  hasCompany: boolean;
  onUpsertPlan: (formData: PlanFormData) => void;
};

const PlanSection = (props: PlanSectionProps) => {
  return props.planId ? (
    <div>{props.planId} yep</div>
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

type CompanySectionProps = {
  company: Company | null;
  onCreateCompany: (formData: CompanyFormData) => void;
};

const CompanySection = (props: CompanySectionProps) => {
  return props.company ? (
    <div>{props.company.name}</div>
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
}

export default PlanPage;
