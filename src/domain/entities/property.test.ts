import { DateRange } from "../value_objects/date_range";
import { Property } from "./property";

describe("Property Entity", () => {
  it("deve criar uma instância de Property com todos os atributos", () => {
    const property = new Property(
      "1",
      "Casa de praia",
      "Uma bela casa na praia",
      4,
      200
    );

    expect(property.getId()).toBe("1");
    expect(property.getName()).toBe("Casa de praia");
    expect(property.getDescription()).toBe("Uma bela casa na praia");
    expect(property.getMaxGuest()).toBe(4);
    expect(property.getBasePricePerNight()).toBe(200);
  });

  it("deve lançar um erro se o nome for vazio", () => {
    expect(() => {
      new Property("1", "", "Descrição", 4, 200);
    }).toThrow("O nome é obrigatório.");
  });

  it("deve lançar um erro se o número maximo de hospedes for zero ou negativo", () => {
    expect(() => {
      new Property("1", "Casa", "Descrição", 0, 200);
    }).toThrow("O número de hospedes deve que ser maior que zero.");
  });

  it("deve validar o número máximo de hóspedes", () => {
    const property = new Property("1", "Casa de campo", "Descrição", 5, 150);

    expect(() => {
      property.validateGuestCount(6);
    }).toThrow("O número máximo de hospedes excedido. Máximo permitido é 5");
  });

  it("não deve aplicar desconto para estadias menores que 7 noites", () => {
    const property = new Property("1", "Apartamento", "Descrição", 2, 100);
    const startDate = new Date("2024-12-10");
    const endDate = new Date("2024-12-16");

    const dateRange = new DateRange(startDate, endDate);
    const totalPrice = property.calculateTotalPrice(dateRange);
    expect(totalPrice).toBe(600);
  });

  it("deve aplicar desconto para estadias de 7 noites ou mais", () => {
    const property1 = new Property("1", "Apartamento", "Descrição", 2, 100);

    const dateRange1 = new DateRange(
      new Date("2024-12-10"),
      new Date("2024-12-17")
    );
    const totalPrice1 = property1.calculateTotalPrice(dateRange1);
    expect(totalPrice1).toBe(630);

    const property2 = new Property("1", "Apartamento", "Descrição", 2, 100);

    const dateRange2 = new DateRange(
      new Date("2024-12-10"),
      new Date("2024-12-18")
    );
    const totalPrice2 = property2.calculateTotalPrice(dateRange2);
    expect(totalPrice2).toBe(720);
  });
});
