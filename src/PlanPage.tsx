import React, { useContext } from 'react';
import {GlobalStateContext} from './App';
import CompanyForm, {CompanyFormData} from './CompanyForm';
import { Company } from './models/company';
import BackendConnector from './BackendConnector';

const PlanPage = () => {
  const [globalState, setGlobalState] = useContext(GlobalStateContext);
  const setCompany = (formData: CompanyFormData) => {
    BackendConnector.createCompany(formData).then(newCompany => {
      setGlobalState(() => ({...globalState, company: newCompany}));
    });
  };

  return (
    <>
      <div>Plan for {globalState.user?.email ?? 'none'}</div>
      <CompanySection company={globalState.company} onCreateCompany={setCompany} />
    </>
  );
};

type CompanySectionProps = {
  company: Company | null;
  onCreateCompany: (formData: CompanyFormData) => void;
};

const CompanySection = (props: CompanySectionProps) => {
  return props.company ? (
    <div>{props.company.name}</div>
  ) : <CompanyForm onSubmit={props.onCreateCompany} />;
}

export default PlanPage;
