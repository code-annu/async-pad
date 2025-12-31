import { UserCreate, User, UserUpdate } from "../entities/user-entity";

export interface IUserRepository {
  create(user: UserCreate): Promise<User>;
  update(id: string, updates: UserUpdate): Promise<User>;
  delete(id: string): Promise<User>;
  findById(id: string): Promise<User | null>;
  findByUsername(username: string): Promise<User | null>;
  findManyByIds(ids: string[]): Promise<User[]>;
  findManyByUsername(username: string): Promise<User[]>;
}
