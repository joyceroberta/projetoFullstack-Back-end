import { Authenticator } from "./services/Authenticator";
import { HashManager } from "./services/HashManager";
import { IdGenerator } from "./services/IdGenerator";
import { Post, PostInputDTO, Tag } from "./entities/Post"
import { CustomError } from "./error/CustomError";
import { AuthenticationData } from "./entities/User";
import dayjs from "dayjs";
import { PostDatabase } from "../data/PostDatabase";

export class PostBusiness{
    constructor(
        private idGenerator: IdGenerator,
        private authenticator: Authenticator,
        private postDatabase: PostDatabase
    ){}

    public createPost = async (input: PostInputDTO): Promise<void> => {
        try {
            if(!input.subtitle || !input.file || !input.tag || !input.collection || !input.token){
                throw new CustomError(
                  406,
                  "Por favor preencha todos os campos."
                );
            }

            const tokenData: AuthenticationData = this.authenticator.getData(input.token)

            const idPost: string = this.idGenerator.generate();
            const idTag: string = this.idGenerator.generate();

            
            const date = dayjs().format("YYYY-MM-DD");

            const newTag: Tag = {
                id: idTag,
                authorId: tokenData.id,
                name: input.tag
            }


            const newPost: Post = new Post(
                idPost,
                input.subtitle,
                date,
                input.file,
                input.collection,
                tokenData.id
            )

            await this.postDatabase.createPost(newPost, newTag)
        

            
        } catch (error) {
             throw new CustomError(error.statusCode, error.message); 
            
        }

    }
}