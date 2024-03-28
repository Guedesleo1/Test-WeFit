import { Response, Controller, HttpRequest, HttpResponse } from ".";
import { CreateUserUseCase } from "../../data/modules/useCase/create-users-usecase";
import { ICreateUserUseCase } from "../../domain/usecases/Icreate-users-usecase";

export class CreateUsersController implements Controller {

    private readonly createUser: ICreateUserUseCase;

    constructor(createUser: ICreateUserUseCase) {
        this.createUser = createUser;
    }

    async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
        try {
            const { data } = httpRequest.request;
            const  bodyUser = httpRequest.body;
    
            const result =   await this.createUser.create({
                id: data.userId,
                email: data.email,
                name: data.name,
                ...bodyUser,
                documentType: bodyUser.documentType ? 'Pessoa Física' : 'Pessoa Juridica'
            })
            if (result.isFailure) {
                return Response.badRequest(result.error);
            }
    
            return Response.ok(result);
        } catch (error) {
            return Response.serverError();
        }
    
    }
}