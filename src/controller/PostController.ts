import { Request, Response } from "express";
import { PostInputDTO } from "../business/entities/Post";
import { PostBusiness } from "../business/PostBusiness";
import { Authenticator } from "../business/services/Authenticator";
import { IdGenerator } from "../business/services/IdGenerator";
import { PostDatabase } from "../data/PostDatabase";

const postBusiness = new PostBusiness(
    new IdGenerator(),
    new Authenticator(),
    new PostDatabase()
);

export class PostController{
    public createPost = async (req: Request, res: Response): Promise<void> => {
        try {
            const token: string = req.headers.authorization as string;

            const input: PostInputDTO ={
                token: token,
                subtitle: req.body.subtitle,
                file: req.body.file,
                tag: req.body.tag,
                collection: req.body.collection
            }

            await postBusiness.createPost(input)

            res
                .status(200)
                .send("Post criado com sucesso!")
            
        } catch (error) {
            res.status(error.statusCode || 400).send({ error: error.message });
            
        }
    }
}