export class DateRange {
  private startDate: Date;
  private endDate: Date;

  constructor(startDate: Date, endDate: Date) {
    this.validateDates(startDate, endDate);
    this.startDate = startDate;
    this.endDate = endDate;
  }

  private validateDates(startDate: Date, endDate: Date) {
    if (endDate == startDate) {
      throw new Error("A data de início e término não podem ser iguais.");
    }
    if (endDate < startDate) {
      throw new Error("A data de término deve ser posterior à data de início.");
    }
  }

  getStartDate(): Date {
    return this.startDate;
  }

  getEndDate(): Date {
    return this.endDate;
  }

  getTotalNights(): number {
    const diffTime = this.endDate.getTime() - this.startDate.getTime();
    const oneDay = 1000 * 3600 * 24;
    return Math.ceil(diffTime / oneDay);
  }

  overlaps(other: DateRange): boolean {
    return (
      this.startDate < other.getEndDate() && other.getStartDate() < this.endDate
    );
  }
}
