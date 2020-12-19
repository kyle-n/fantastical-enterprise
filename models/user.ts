type BooleanDigit = 0 | 1;

export interface UserData {
  id: number;
  email: string;
  password: string;
  companyId: number;
  active: boolean | BooleanDigit;
  lastSignInDate: Date;
  signUpDate: Date;
}

export class User implements UserData {
  id: number;
  email: string;
  password: string;

  companyId: number;
  active: boolean;
  lastSignInDate: Date;
  signUpDate: Date;

  constructor(userData: UserData) {
    this.id = userData.id;
    this.email = userData.email;
    this.password = userData.password;
    this.companyId = userData.companyId;
    this.active = Boolean(userData.active);
    this.lastSignInDate = userData.lastSignInDate;
    this.signUpDate = userData.signUpDate;
  }

  toJson(): UserData {
    return {
      id: this.id,
      email: this.email,
      password: this.password,
      companyId: this.companyId,
      active: this.active,
      lastSignInDate: this.lastSignInDate,
      signUpDate: this.signUpDate
    };
  }

}