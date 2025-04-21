import { User } from "../entities/user";

export interface UserRepository {
  findById(id: string): Promise<User | null>;
  saveUser(user: User): Promise<void>;
}
