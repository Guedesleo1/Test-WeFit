import { ICreateTokenUseCase, IResponseCreateToken, lokenCreateDTO } from "../../../domain/usecases/Icrate-token-usecase";
import { Result } from "../../helpers/result";
import { Encrypter } from "../../protocols/encrypter";
import { ITokenGenerator } from "../../protocols/jwt";
import { LoginRepository } from "../../protocols/login-repository";

export interface CreateTokenConstructor {
    loginRepo: LoginRepository;
    encrypter: Encrypter;
    jwt: ITokenGenerator;
}

export class CreateTokenUseCase implements ICreateTokenUseCase {
    private readonly loginRepository: LoginRepository;
    private readonly encrypter: Encrypter;
    private readonly jwt: ITokenGenerator;

    constructor({ loginRepo, encrypter, jwt }: CreateTokenConstructor) {
        this.loginRepository = loginRepo;
        this.encrypter = encrypter;
        this.jwt = jwt
    }

    async create(token: lokenCreateDTO): Promise<Result<IResponseCreateToken>> {
        const loginExists = await this.loginRepository.findByEmail(token.email.toUpperCase());

        if (!loginExists) {
            return Result.fail("Email invalid");
          }

        const isMatch = await this.encrypter.compare({
            password: token.password,
            hash: loginExists.password,
        });
        if (!isMatch) {
            return Result.fail("Password invalid");
          }

        const accessToken = this.jwt.generate(loginExists)

        return Result.ok({accessToken});
    }
}