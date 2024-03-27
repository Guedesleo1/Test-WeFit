import { CreateLoginUseCase } from "../../data/modules/useCase/create-login-usecase";
import { CreateTokenUseCase } from "../../data/modules/useCase/create-token-usecase";
import { Bcrypt } from "../../infra/database/adapters/encrypter/bcrypt";
import { Uuid } from "../../infra/database/adapters/id-generator/uuid";
import { Auth } from "../../infra/database/adapters/jwt/Auth";
import { LoginRepositoryTypeorm } from "../../infra/database/typeorm/repositories/LoginRepositoryTypeorm";
import { CreateLoginController } from "../../presentation/controller/create-login-controller";
import { CreateTokenController } from "../../presentation/controller/create-token-controller";

export class CreateTokenFactory {
    static register(): CreateTokenController {
        const encrypter = new Bcrypt();
        const loginRepository = new LoginRepositoryTypeorm();
        const jwt = new Auth();
        const createTokenUseCase = new CreateTokenUseCase({
            loginRepo: loginRepository,
            encrypter,
            jwt
        });
        return new CreateTokenController(createTokenUseCase);
    }
}