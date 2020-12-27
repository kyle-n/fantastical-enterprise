import axios from 'axios';
import { User, UserData } from './models/user';
import {UserFormData} from './UserForm';
import {CompanyFormData} from './CompanyForm';
import { Company, CompanyData } from './models/company';
import { FantasticalEnterprisePlan, FantasticalEnterprisePlanData } from './models/fantastical-enterprise-plan';

async function signup(formData: UserFormData): Promise<User> {
  const url = '/api/users';
  const now = new Date();
  const body = {
    ...formData,
    companyId: null,
    active: true,
    lastSignInDate: now,
    signUpDate: now
  };
  const response = await axios.post(url, body);
  const newUserData: UserData = response.data;
  return new User(newUserData);
}

async function login(formData: UserFormData): Promise<User> {
  const url = '/api/users/login';
  const response = await axios.post(url, formData);
  const userData: UserData = response.data;
  return new User(userData);
}

async function createCompany(formData: CompanyFormData, userId: number): Promise<Company> {
  const url = '/api/companies';
  const body = {...formData, planAdministratorId: userId, planId: null};
  const response = await axios.post(url, body);
  const companyData: CompanyData = response.data;
  return new Company(companyData);
}

async function updateCompany(companyId: number, formData: CompanyFormData): Promise<Company> {
  const url = '/api/companies/' + companyId;
  const response = await axios.patch(url, formData);
  const companyData: CompanyData = response.data;
  return new Company(companyData);
}

async function getCompany(companyId: number): Promise<Company> {
  const url = '/api/companies/' + companyId;
  const response = await axios.get(url);
  const companyData: CompanyData = response.data;
  return new Company(companyData);
}

async function getPlans(): Promise<Array<FantasticalEnterprisePlan>> {
  const url = '/api/plans';
  const response = await axios.get(url);
  const plans: Array<FantasticalEnterprisePlanData> = response.data.plans;
  return plans.map(planData => new FantasticalEnterprisePlan(planData));
}

async function getPlan(planId: number): Promise<FantasticalEnterprisePlan> {
  const url = '/api/plans/' + planId;
  const response = await axios.get(url);
  const planData: FantasticalEnterprisePlanData = response.data;
  return new FantasticalEnterprisePlan(planData);
}

const BackendConnector = {
  signup,
  login,
  createCompany,
  updateCompany,
  getCompany,
  getPlans,
  getPlan
};

export default BackendConnector;
