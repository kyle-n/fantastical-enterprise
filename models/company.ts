export interface CompanyData {
  id: number;
  name: string;
  planAdministratorId: number;
  planId: number;
  userIds: number[];
}

export class Company {
  id: number;
  name: string;
  planAdministratorId: number;
  planId: number;
  userIds: number[];

  constructor(companyData: CompanyData) {
    this.id = companyData.id;
    this.name = companyData.name;
    this.planAdministratorId = companyData.planAdministratorId;
    this.planId = companyData.planId;
    this.userIds = companyData.userIds;
  }

  toJson(): CompanyData {
    return {
      id: this.id,
      name: this.name,
      planAdministratorId: this.planAdministratorId,
      planId: this.planId,
      userIds: this.userIds
    };
  }
}
