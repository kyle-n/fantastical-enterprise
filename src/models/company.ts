export interface CompanyData {
  id: number;
  name: string;
  planAdministratorId: number;
  planId: number;
  totalSeats: number;
  activeSeats: number;
  userIds: number[];
}

export class Company {
  id: number;
  name: string;
  planAdministratorId: number;
  planId: number;
  totalSeats: number;
  activeSeats: number;
  userIds: number[];

  constructor(companyData: CompanyData) {
    this.id = companyData.id;
    this.name = companyData.name;
    this.planAdministratorId = companyData.planAdministratorId;
    this.planId = companyData.planId;
    this.totalSeats = companyData.totalSeats;
    this.activeSeats = companyData.activeSeats;
    this.userIds = companyData.userIds;
  }

  get availableSeats(): number {
    return this.totalSeats - this.activeSeats;
  }

  toJson(): CompanyData {
    return {
      id: this.id,
      name: this.name,
      planAdministratorId: this.planAdministratorId,
      planId: this.planId,
      totalSeats: this.totalSeats,
      activeSeats: this.activeSeats,
      userIds: this.userIds
    };
  }
}
