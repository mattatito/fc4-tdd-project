import { DataSource, Repository } from "typeorm";
import { UserEntity } from "../persistence/entities/user_entity";
import { PropertyEntity } from "../persistence/entities/property_entity";
import { TypeORMPropertyRepository } from "../repositories/typeorm_property_repository";
import { v4 as uuidV4 } from "uuid";
import { Property } from "../../domain/entities/property";

describe("Type ORM Property Repository", () => {
  let dataSource: DataSource;
  let propertyRepository: TypeORMPropertyRepository;
  let repository: Repository<PropertyEntity>;

  beforeAll(async () => {
    dataSource = new DataSource({
      type: "sqlite",
      database: ":memory:",
      dropSchema: true,
      entities: [UserEntity, PropertyEntity],
      synchronize: true,
      logging: false,
    });
    await dataSource.initialize();
    repository = dataSource.getRepository(PropertyEntity);
    propertyRepository = new TypeORMPropertyRepository(repository);
  });

  afterAll(async () => {
    await dataSource.destroy();
  });

  it("deve salvar uma propriedade com sucesso", async () => {
    const property = new Property(
      "1",
      "Casa na Praia",
      "Vista para o mar",
      6,
      200
    );

    await propertyRepository.save(property);

    const savedProperty = await repository.findOne({ where: { id: "1" } });
    expect(savedProperty).not.toBeNull();
    expect(savedProperty?.id).toBe("1");
  });

  it("deve buscar uma propriedade com ID válido", async () => {
    const property = new Property(
      "1",
      "Casa na Praia",
      "Vista para o mar",
      6,
      200
    );
    await propertyRepository.save(property);

    const foundProperty = await propertyRepository.findById("1");
    expect(foundProperty).not.toBeNull();
    expect(foundProperty?.getId()).toBe("1");
    expect(foundProperty?.getName()).toBe("Casa na Praia");
    expect(foundProperty?.getDescription()).toBe("Vista para o mar");
    expect(foundProperty?.getMaxGuest()).toBe(6);
    expect(foundProperty?.getBasePricePerNight()).toBe(200);
  });

  it("deve retornar null ao buscar uma propriedade inexistente", async () => {
    const foundProperty = await propertyRepository.findById("999");
    expect(foundProperty).toBeNull();
  });
});
