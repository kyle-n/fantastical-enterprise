export default class User {
  id: number;
  email: string;
  password: string;

  companyId: number;
  active: boolean;
  lastSignedIn: Date;
  signedUp: Date;
}