import { UserDatabase } from "../data/UserDatabase";
import { User, UserInputDTO } from "./entities/User";
import { CustomError } from "./error/CustomError";
import { Authenticator } from "./services/Authenticator";
import { HashManager } from "./services/HashManager";
import { IdGenerator } from "./services/IdGenerator";

export class UserBusiness{
    constructor(
      private idGenerator: IdGenerator,
      private hashManager: HashManager,
      private authenticator: Authenticator,
      private userDatabase: UserDatabase,
   ) { }

   async createUser(user: UserInputDTO){
       try {
           if(!user.name || !user.email || !user.password || !user.nickname || !user.profilePicture){
           throw new CustomError(
             406,
             "Por favor preencha todos os campos: 'nome', 'email', 'senha', 'nickname' e 'foto do perfil'."
           );
       }

       if(user.password.length < 6){
           throw new CustomError(422, "Senha inválida. Deve conter no mínimo 6 caracteres.");
       }

       if(user.email.indexOf("@") === -1){
            throw new CustomError(
              422,
              "Email inválido."
            );

       }

       const id = this.idGenerator.generate();

       const hashPassword = await this.hashManager.hash(user.password);

       const newUser: User = new User(
           id,
           user.name,
           user.email,
           user.nickname,
           hashPassword,
           user.profilePicture
       )

       await this.userDatabase.createUser(newUser)

       const accessToken = this.authenticator.generateToken({
           id
       })

       return accessToken;

   } catch (error) {
       throw new CustomError(error.statusCode, error.message);
       }
   }
}
