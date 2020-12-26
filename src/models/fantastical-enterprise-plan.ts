interface FantasticalEnterprisePlanData {
  id: number;
  name: string;
  monthlyPerMonthCost: number;
  yearlyPerMonthCost: number;
}

export class FantasticalEnterprisePlan implements FantasticalEnterprisePlanData {
  id: number;
  name: string;
  monthlyPerMonthCost: number;
  yearlyPerMonthCost: number;

  constructor(planData: FantasticalEnterprisePlanData) {
    this.id = planData.id;
    this.name = planData.name;
    this.monthlyPerMonthCost = planData.monthlyPerMonthCost;
    this.yearlyPerMonthCost = planData.yearlyPerMonthCost;
  }

  get monthlyPerYearCost(): number {
    return this.monthlyPerMonthCost * 12;
  }

  get yearlyPerYearCost(): number {
    return this.yearlyPerMonthCost * 12;
  }

  toJson(): FantasticalEnterprisePlanData {
    return {
      id: this.id,
      name: this.name,
      monthlyPerMonthCost: this.monthlyPerMonthCost,
      yearlyPerMonthCost: this.yearlyPerMonthCost
    };
  }
}
