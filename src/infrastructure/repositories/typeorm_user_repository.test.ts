import { DataSource, Repository } from "typeorm";
import { User } from "../../domain/entities/user";
import { UserEntity } from "../persistence/entities/user_entity";
import { TypeORMUserRepository } from "../repositories/typeorm_user_repository";
import { v4 as uuidV4 } from "uuid";

describe("Type ORM User Repository", () => {
  let dataSource: DataSource;
  let userRepository: TypeORMUserRepository;
  let repository: Repository<UserEntity>;

  beforeAll(async () => {
    dataSource = new DataSource({
      type: "sqlite",
      database: ":memory:",
      dropSchema: true,
      entities: [UserEntity],
      synchronize: true,
      logging: false,
    });
    await dataSource.initialize();
    repository = dataSource.getRepository(UserEntity);
    userRepository = new TypeORMUserRepository(repository);
  });

  afterAll(async () => {
    await dataSource.destroy();
  });

  it("deve salvar um usuário com sucesso", async () => {
    const userId = uuidV4();
    const user = new User(userId, "John Doe");

    await userRepository.save(user);

    const savedUser = await repository.findOne({ where: { id: userId } });
    expect(savedUser).not.toBeNull();
    expect(savedUser?.id).toBe(userId);
  });

  it("deve retornar um usuário quando um ID Válido for fornecido", async () => {
    const userId = uuidV4();
    const user = new User(userId, "John Doe");
    await userRepository.save(user);

    const savedUser = await userRepository.findById(userId);
    expect(savedUser).not.toBeNull();
    expect(savedUser?.getId()).toBe(userId);
    expect(savedUser?.getName()).toBe("John Doe");
  });

  it("deve retornar null ao buscar um usuário inexistente", async () => {
    const user = await userRepository.findById("999");
    expect(user).toBeNull();
  });
});
