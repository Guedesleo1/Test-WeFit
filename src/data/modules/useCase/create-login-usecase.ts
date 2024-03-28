import { ICreateLoginUseCase, IResponseCreateLogin, loginCreateDTO } from "../../../domain/usecases/Icreate-login-usecase";
import { Result } from "../../helpers/result";
import { Encrypter } from "../../protocols/encrypter";
import { IdGenerator } from "../../protocols/id-generator";
import { LoginRepository } from "../../protocols/login-repository";

export interface CreateLoginConstructor {
    loginRepo: LoginRepository;
    encrypter: Encrypter;
    idGenerator: IdGenerator;
}

export class CreateLoginUseCase implements ICreateLoginUseCase{
    private readonly loginRepository: LoginRepository;
    private readonly idGenerator: IdGenerator;
    private readonly encrypter: Encrypter;

    constructor({ loginRepo, encrypter, idGenerator }: CreateLoginConstructor) {
        this.loginRepository = loginRepo;
        this.encrypter = encrypter;
        this.idGenerator = idGenerator;
    }

    async create(login: loginCreateDTO): Promise<Result<IResponseCreateLogin>> {
        const userExists = await this.loginRepository.exists({
            email: login.email.toUpperCase(),
        });
        if (userExists) {
            return Result.fail("User already exists");
        }

        const newUser = await this.loginRepository.create({
            userId: this.idGenerator.random(),
            email: login.email,
            name: login.name,
            password: await this.encrypter.hash(login.password),
        });

        return Result.ok<IResponseCreateLogin>(newUser);
    }
}