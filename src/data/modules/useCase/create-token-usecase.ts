import { LoginEntity } from "../../../infra/database/typeorm/entities/login.entity";
import { Result } from "../../helpers/result";
import { Encrypter } from "../../protocols/encrypter";
import { IdGenerator } from "../../protocols/id-generator";
import { ITokenGenerator } from "../../protocols/jwt";
import { LoginRepository } from "../../protocols/login-repository";

interface CreateTokenConstructor {
    loginRepo: LoginRepository;
    encrypter: Encrypter;
    jwt: ITokenGenerator;
}

export class CreateTokenUseCase {
    private readonly loginRepository: LoginRepository;
    private readonly encrypter: Encrypter;
    private readonly jwt: ITokenGenerator;

    constructor({ loginRepo, encrypter, jwt }: CreateTokenConstructor) {
        this.loginRepository = loginRepo;
        this.encrypter = encrypter;
        this.jwt = jwt
    }

    async create(email:string, password: string): Promise<Result<any>> {
        const loginExists = await this.loginRepository.findByEmail(email.toUpperCase());

        if (!loginExists) {
            throw new Error('Email invalid');
          }

        const isMatch = await this.encrypter.compare({
            password: password,
            hash: loginExists.password,
        });
        if (!isMatch) {
            throw new Error('Password invalid');
          }

          const accessToken = this.jwt.generate(loginExists.id)

        return Result.ok<any>({accessToken});
    }
}