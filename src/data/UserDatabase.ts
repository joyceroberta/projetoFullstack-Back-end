import { User } from "../business/entities/User";
import { CustomError } from "../business/error/CustomError";
import { BaseDatabase } from "./BaseDatabase";

export class UserDatabase extends BaseDatabase {
  private static TABLE_NAME = "photomet_users";

  public async createUser(
    id: string,
    name: string,
    email: string,
    nickname: string,
    password: string,
    profilePicture: string
  ): Promise<void> {
    try {
      await BaseDatabase.connection
        .insert({ id, name, email, nickname, password, profilePicture })
        .into(UserDatabase.TABLE_NAME);
    } catch (error) {
      throw new CustomError(500, "Deu ruim rapá");
    }
  }
}
