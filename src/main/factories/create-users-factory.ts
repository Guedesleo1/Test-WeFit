import { CreateUserUseCase } from "../../data/modules/useCase/create-users-usecase";
import { ViaCEP } from "../../infra/database/adapters/viacep/viacep";
import { AddressRepositoryTypeorm } from "../../infra/database/typeorm/repositories/AddressRepositoryTypeorm";
import { UserRepositoruTypeorm } from "../../infra/database/typeorm/repositories/UserRepositoryTypeorm";
import { CreateUsersController } from "../../presentation/controller/create-users-controller";

export class CreateUsersFactory {
    static register(): CreateUsersController {
        const viaCep = new ViaCEP();
        const addressRepository = new AddressRepositoryTypeorm();
        const userRepository = new UserRepositoruTypeorm();
        const createUserUseCase = new CreateUserUseCase({
            viaCep,
            addressRepo: addressRepository,
            userRepo: userRepository
        })
        return new CreateUsersController(createUserUseCase);
    }
}