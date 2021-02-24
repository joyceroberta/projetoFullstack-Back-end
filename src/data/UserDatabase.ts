import { User } from "../business/entities/User";
import { CustomError } from "../business/error/CustomError";
import { BaseDatabase } from "./BaseDatabase";

export class UserDatabase extends BaseDatabase {
  private static TABLE_NAME = "photomet_users";

  public async createUser(user: User): Promise<void> {
    try {
      await BaseDatabase.connection
        .insert(user)
        .into(UserDatabase.TABLE_NAME);
    } catch (error) {
      throw new CustomError(500, "Deu ruim rapá");
    }
  }

  public async selectUserByEmail(email: string): Promise<User | null>{
    try {
      const result = await BaseDatabase.connection
        .select("*")
        .from(UserDatabase.TABLE_NAME)
        .where({ email });
      

      return new User(
        result[0].id,
        result[0].name,
        result[0].email,
        result[0].nickname,
        result[0].password,
        result[0].profile_picture
      );  

    } catch (error) {
       throw new CustomError(500, "Deu ruim rapá");
    }
  }
}
