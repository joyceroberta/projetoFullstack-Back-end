import { Request, Response } from "express";
import { UserInputDTO } from "../business/entities/User";
import { Authenticator } from "../business/services/Authenticator";
import { HashManager } from "../business/services/HashManager";
import { IdGenerator } from "../business/services/IdGenerator";
import { UserBusiness } from "../business/userBusiness";
import { UserDatabase } from "../data/UserDatabase";

const userBusiness = new UserBusiness(
    new IdGenerator(),
    new HashManager,
    new Authenticator(),
    new UserDatabase()
)

export class UserController{
    async signup(req: Request, res: Response){
        try {

            const input: UserInputDTO = {
                name: req.body.name,
                email: req.body.email,
                password: req.body.password,
                nickname: req.body.nickname,
                profilePicture: req.body.profilePicture
            }

            const token = await userBusiness.createUser(input);

            res.status(200).send({token});
            
        } catch (error) {
            res.status(error.statusCode || 400)
            .send({error: error.message})
            
        }
    }
}