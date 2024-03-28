import "reflect-metadata";
import { RelationId, Repository } from "typeorm";
import { dateBaseSource } from "../data-source";
import { IUserRepository } from "../../../../data/protocols/user-repository";
import { UserEntity } from "../entities/user.entity";
import { UserDomain } from "../../../../domain/entities/user-domain";

export class UserRepositoruTypeorm implements IUserRepository {
    private readonly userEntity: Repository<UserDomain>;
    constructor() {
        this.userEntity = dateBaseSource.getRepository<UserDomain>(UserEntity)
    }
    async create(user: UserDomain): Promise<any> {
        const userCreate = this.userEntity.create(user);
        await this.userEntity.save(userCreate);
        return userCreate;
    }

}