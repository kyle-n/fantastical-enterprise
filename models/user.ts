export default class User {
  id: number;
  email: string;
  password: string;

  companyId: number;
  active: boolean;
  lastSignInDate: Date;
  signUpDate: Date;

  constructor() {}
}