import { Property } from "../../domain/entities/property";
import { PropertyRepository } from "../../domain/repositories/property_repository";

export class FakePropertyRepository implements PropertyRepository {
  private properties: Property[] = [
    new Property("1", "Apartamento", "Apartamento Moderno", 4, 100),
    new Property("2", "Casa", "Casa Moderna", 6, 200),
  ];

  async save(property: Property): Promise<void> {
    this.properties.push(property);
  }
  async findById(id: string): Promise<Property | null> {
    return this.properties.find((property) => property.getId() === id) ?? null;
  }
}
