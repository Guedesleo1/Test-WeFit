import { Repository } from "typeorm";
import { theWordDatabase } from "../data-source";
import { LoginEntity } from "../entities/Login.entity";
import { LoginRepository } from "../../../../data/protocols/login-repository";
import { LoginDomain } from "../../../../domain/entities/loginDomain";

export class LoginRepositoryTypeorm implements LoginRepository {
    private readonly loginEntity: Repository<LoginDomain>;
    constructor() {
        this.loginEntity = theWordDatabase.getRepository<LoginDomain>(LoginEntity);
    }
    async create(userLogin: any): Promise<any> {
        console.log("repository")
        const userLoginCreate = this.loginEntity.create(userLogin);
        await this.loginEntity.save(userLoginCreate);
        return userLoginCreate;
    }

    async exists({ email }: { email: string }): Promise<boolean> {
        console.log("aqui 2")
        const userExists = await this.loginEntity.findOne({ where: { email } });
        console.log("userExists", userExists)
        return !!userExists;
    }
}