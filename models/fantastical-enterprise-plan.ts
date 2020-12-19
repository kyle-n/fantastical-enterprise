interface FantasticalEnterprisePlanData {
  id: number;
  name: string;
  monthlyPerMonthCost: number;
  yearlyPerMonthCost: number;
  totalSeats: number;
  activeSeats: number;
}

export class FantasticalEnterprisePlan implements FantasticalEnterprisePlanData {
  id: number;
  name: string;
  monthlyPerMonthCost: number;
  yearlyPerMonthCost: number;
  totalSeats: number;
  activeSeats: number;

  constructor(planData: FantasticalEnterprisePlanData) {
    this.id = planData.id;
    this.name = planData.name;
    this.monthlyPerMonthCost = planData.monthlyPerMonthCost;
    this.yearlyPerMonthCost = planData.yearlyPerMonthCost;
    this.totalSeats = planData.totalSeats;
    this.activeSeats = planData.activeSeats;
  }

  get monthlyPerYearCost(): number {
    return this.monthlyPerMonthCost * 12;
  }

  get yearlyPerYearCost(): number {
    return this.yearlyPerMonthCost * 12;
  }

  get availableSeats(): number {
    return this.totalSeats - this.activeSeats;
  }

  toJson(): FantasticalEnterprisePlanData {
    return {
      id: this.id,
      name: this.name,
      monthlyPerMonthCost: this.monthlyPerMonthCost,
      yearlyPerMonthCost: this.yearlyPerMonthCost,
      totalSeats: this.totalSeats,
      activeSeats: this.activeSeats
    };
  }
}
