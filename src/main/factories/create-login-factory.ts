import { CreateLoginUseCase } from "../../data/modules/useCase/create-login-usecase";
import { Bcrypt } from "../../infra/database/adapters/encrypter/bcrypt";
import { Uuid } from "../../infra/database/adapters/id-generator/uuid";
import { LoginRepositoryTypeorm } from "../../infra/database/typeorm/repositories/LoginRepositoryTypeorm";
import { CreateLoginController } from "../../presentation/controller/create-login-controller";

export class CreateLoginFactory {
    static register(): CreateLoginController {
        const idGenerator = new Uuid();
        const encrypter = new Bcrypt();
        const loginRepository = new LoginRepositoryTypeorm();
        const createLoginUseCase = new CreateLoginUseCase({
            loginRepo: loginRepository,
            encrypter,
            idGenerator,
        });
        return new CreateLoginController(createLoginUseCase);
    }
}