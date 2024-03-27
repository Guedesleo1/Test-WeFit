import { CreateUsersController } from "../../presentation/controller/create-users-controller";

export class CreateUsersFactory {
    static register(): CreateUsersController {
        return new CreateUsersController();
    }
}