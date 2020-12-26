import axios from 'axios';
import { User, UserData } from './models/user';
import {UserFormData} from './UserForm';

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

const BackendConnector = {
  signup,
  login
};

export default BackendConnector;
