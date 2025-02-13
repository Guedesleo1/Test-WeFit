import { Response, Controller, HttpRequest, HttpResponse } from ".";
import { CreateLoginUseCase } from "../../data/modules/useCase/create-login-usecase";
import { ICreateLoginUseCase } from "../../domain/usecases/Icreate-login-usecase";

export class CreateLoginController implements Controller {
    private readonly createAuthentication: ICreateLoginUseCase;

    constructor(createAuthentication: ICreateLoginUseCase) {
        this.createAuthentication = createAuthentication;
    }

    async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
        try {
            if (!httpRequest.body) {
                return Response.badRequest({ field: "body" });
            }

            const requiredFields = ["email", "name", "password"];
            for (const field of requiredFields) {
                if (!httpRequest.body[field]) {
                    return Response.badRequest({ field });
                }
            }

            const { email, name, password } = httpRequest.body;

            const result = await this.createAuthentication.create({
                name,
                email,
                password,
            });
            if (result.isFailure) {
                return Response.badRequest(result.error);
            }

            return Response.ok(result.getValue());
        } catch (error) {
            return Response.serverError();
        }
    }
}