import { DateRange } from "../value_objects/date_range";
import { Booking } from "./booking";

export class Property {
  private readonly bookings: Booking[] = [];

  constructor(
    private id: string,
    private name: string,
    private description: string,
    private maxGuest: number,
    private basePricePerNight: number
  ) {
    if (!name) {
      throw new Error("O nome é obrigatório.");
    }
    if (maxGuest <= 0) {
      throw new Error("O número de hospedes deve que ser maior que zero.");
    }
    this.id = id;
    (this.name = name),
      (this.description = description),
      (this.maxGuest = maxGuest);
    this.basePricePerNight = basePricePerNight;
  }

  getId(): string {
    return this.id;
  }

  getName(): string {
    return this.name;
  }

  getDescription(): string {
    return this.description;
  }

  getMaxGuest(): number {
    return this.maxGuest;
  }

  getBasePricePerNight(): number {
    return this.basePricePerNight;
  }

  validateGuestCount(guestCount: number): void {
    if (guestCount > this.maxGuest) {
      throw Error(
        `O número máximo de hospedes excedido. Máximo permitido é ${this.maxGuest}`
      );
    }
  }

  calculateTotalPrice(dateRange: DateRange): number {
    const totalNights = dateRange.getTotalNights();
    let totalPrice = totalNights * this.basePricePerNight;
    if (totalNights >= 7) {
      totalPrice *= 0.9;
    }
    return totalPrice;
  }

  isAvailable(dateRange: DateRange): boolean {
    return !this.bookings.some(
      (booking) =>
        booking.getStatus() === "CONFIRMED" &&
        booking.getDateRange().overlaps(dateRange)
    );
  }

  addBooking(booking: Booking): void {
    this.bookings.push(booking);
  }
}
