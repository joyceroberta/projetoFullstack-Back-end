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

            const postInput: PostInputDTO ={
                subtitle: req.body.subtitle,
                file: req.body.file,
                name: req.body.name,
                collection: req.body.collection
            }

            await postBusiness.createPost(postInput, token)

            res
                .status(200)
                .send("Post criado com sucesso!")
            
        } catch (error) {
            res.status(error.statusCode || 400).send({ error: error.message });
            
        }
    }

    public getAllPosts = async (req: Request, res: Response): Promise<void> => {
        try {
            const token: string = req.headers.authorization as string;

            const result = await postBusiness.getAllPosts(token)

            res
                .status(200)
                .send(result)
            
        } catch (error) {
             res
                .status(error.statusCode || 400)
                .send({ error: error.message });
        }
    }

    public getPostById = async (req: Request, res: Response): Promise<void> => {
        try {
            const token: string = req.headers.authorization as string
            const id = req.params.id

            const result = await postBusiness.getPostById(id, token)
            
            res.status(200).send(result);
        } catch (error) {

             res.status(error.statusCode || 400).send({ error: error.message });
            
        }
    }
}