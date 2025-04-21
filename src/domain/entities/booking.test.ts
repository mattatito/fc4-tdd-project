import { DateRange } from "../value_objects/date_range";
import { Property } from "./property";
import { User } from "./user";
import { Booking } from "./booking";

describe("Booking entity", () => {
  it("deve criar uma instancia de Booking com todos os atributos", () => {
    const property = new Property("1", "Casa", "Descrição", 4, 100);
    const user = new User("1", "João silva");
    const dateRange = new DateRange(
      new Date("2024-12-20"),
      new Date("2024-12-25")
    );

    const booking = new Booking("1", property, user, dateRange, 2);

    expect(booking.getId()).toBe("1");
    expect(booking.getProperty()).toBe(property);
    expect(booking.getUser()).toBe(user);
    expect(booking.getDateRange()).toBe(dateRange);
    expect(booking.getGuestCount()).toBe(2);
  });

  it("deve lançar um erro se o numero de hospedes for zero ou negativo", () => {
    const property = new Property("1", "Casa", "Descrição", 5, 150);
    const user = new User("1", "José santos");
    const dateRange = new DateRange(
      new Date("2024-12-10"),
      new Date("2024-12-15")
    );

    expect(() => {
      new Booking("1", property, user, dateRange, 0);
    }).toThrow("O número de hóspedes deve ser maior que zero.");
  });

  it("deve lançar um erro ao tentar reservar com numero de hospedes acima do máximo permitido", () => {
    const property = new Property("1", "Casa", "Descrição", 4, 150);
    const user = new User("1", "José santos");
    const dateRange = new DateRange(
      new Date("2024-12-10"),
      new Date("2024-12-15")
    );

    expect(() => {
      new Booking("1", property, user, dateRange, 5);
    }).toThrow("O número máximo de hospedes excedido. Máximo permitido é 4");
  });
});
