import { User } from "../business/entities/User";
import { BaseDatabase } from "./BaseDatabase";

export class UserDatabase extends BaseDatabase {
  private static TABLE_NAME = "photomet_users";

  public async createUser(user: User): Promise<void> {
    try {
      await BaseDatabase.connection
        .insert(user)
        .into(UserDatabase.TABLE_NAME);
    } catch (error) {
      throw new Error("Deu ruim rapá");
    }
  }
}