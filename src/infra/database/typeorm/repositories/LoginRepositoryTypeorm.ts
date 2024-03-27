import "reflect-metadata";
import { Repository } from "typeorm";
import { dateBaseSource } from "../data-source";
import { LoginRepository } from "../../../../data/protocols/login-repository";
import { LoginDomain } from "../../../../domain/entities/loginDomain";
import { LoginEntity } from "../entities/login.entity";

export class LoginRepositoryTypeorm implements LoginRepository {
    private readonly loginEntity: Repository<LoginDomain>;
    constructor() {
        this.loginEntity = dateBaseSource.getRepository<LoginDomain>(LoginEntity)
    }
    async create(userLogin: any): Promise<any> {
        const userLoginCreate = this.loginEntity.create(userLogin);
        await this.loginEntity.save(userLoginCreate);
        return userLoginCreate;
    }

    async exists({ email }: { email: string }): Promise<boolean> {
        const userExists = await this.loginEntity.findOne({ where: { email } });
        return !!userExists;
    }

    async findByEmail(email: string): Promise<LoginDomain | null> {
        const userExists = await this.loginEntity.findOne({ where: { email } });
        return userExists;
    }
}