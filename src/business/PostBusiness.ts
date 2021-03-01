import { Authenticator } from "./services/Authenticator";
import { IdGenerator } from "./services/IdGenerator";
import { Post, PostFinal, PostInputDTO, Tag, PostFeed } from "./entities/Post";
import { CustomError } from "./error/CustomError";
import { AuthenticationData } from "./entities/User";
import dayjs from "dayjs";
import { PostDatabase } from "../data/PostDatabase";

export class PostBusiness {
  constructor(
    private idGenerator: IdGenerator,
    private authenticator: Authenticator,
    private postDatabase: PostDatabase
  ) {}

  public createPost = async (
    input: PostInputDTO,
    token: string
  ): Promise<void> => {
    try {
      if (!input.subtitle || !input.file || !input.name || !input.collection) {
        throw new CustomError(422, "Por favor preencha todos os campos.");
      }

      const tokenData: AuthenticationData = this.authenticator.getData(token);

      if (!tokenData) {
        throw new CustomError(
          422,
          "Não permitido. Verifique suas credenciais."
        );
      }

      const idPost = this.idGenerator.generate();
      const idTag  = this.idGenerator.generate();

      const date = dayjs().format("YYYY-MM-DD");

      const newTag: Tag = {
        id: idTag,
        author_id: tokenData.id,
        name: input.name,
      };

      const newPost: Post = new Post(
        idPost,
        input.subtitle,
        date,
        input.file,
        input.collection,
        tokenData.id
      );

      await this.postDatabase.createPost(newPost, newTag);
    } catch (error) {
      throw new CustomError(error.statusCode, error.message);
    }
  };

  public getAllPosts = async(token: string): Promise<PostFinal[]> =>{
    try {
      if(!token){
        throw new CustomError(
          422,
          "Não permitido. Verifique suas credenciais."
        );
      }
      
      const tokenData: AuthenticationData = this.authenticator.getData(token)

      if(!tokenData) {
          throw new CustomError(422, "Não permitido. Verifique suas credenciais.");
      }

      const queryResult = await this.postDatabase.selectAll()

      if(!queryResult){
        throw new CustomError(
          404,
          "Não encontrado."
        );
      }

      const result = queryResult.map((item:PostFeed) => {
        return {
          id: item.id,
          subtitle: item.subtitle,
          file: item.file,
          name: item.name,
          author_id: item.author_id,
          nickname: item.nickname,
          profilePicture: item.profilePicture
        }
      })

      return result
      
    } catch (error) {
      throw new CustomError(error.statusCode, error.message);
    }

  }
}
