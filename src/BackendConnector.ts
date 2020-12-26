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

async function createCompany(formData: CompanyFormData, userId: number) {
  const url = '/api/companies';
  const body = {...formData, planAdministratorId: userId};
  const response = await axios.post(url, body);
  const companyData: CompanyData = response.data;
  return new Company(companyData);
}

async function updateCompany(companyId: number, formData: CompanyFormData) {
  const url = '/api/companies/' + companyId;
  const response = await axios.patch(url, formData);
  const companyData: CompanyData = response.data;
  return new Company(companyData);
}

async function getPlans(): Promise<Array<FantasticalEnterprisePlan>> {
  const url = '/api/plans';
  const response = await axios.get(url);
  const plans: Array<FantasticalEnterprisePlanData> = response.data.plans;
  return plans.map(planData => new FantasticalEnterprisePlan(planData));
}

const BackendConnector = {
  signup,
  login,
  createCompany,
  updateCompany,
  getPlans
};

export default BackendConnector;
