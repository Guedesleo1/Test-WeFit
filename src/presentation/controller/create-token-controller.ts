
import { Response, Controller, HttpRequest, HttpResponse } from ".";
import { CreateTokenUseCase } from "../../data/modules/useCase/create-token-usecase";
import { ICreateTokenUseCase } from "../../domain/usecases/Icrate-token-usecase";

export class CreateTokenController implements Controller {

    private readonly createToken: ICreateTokenUseCase;

    constructor(createToken: ICreateTokenUseCase) {
        this.createToken = createToken;
    }

    async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
        try {
            if (!httpRequest.body) {
                return Response.badRequest({ field: "body" });
            }

            const requiredFields = ["email", "password"];
            for (const field of requiredFields) {
                if (!httpRequest.body[field]) {
                    return Response.badRequest({ field });
                }
            }
            const dataToken = httpRequest.body;

            const result = await this.createToken.create(dataToken);
            
            if (result.isFailure) {
                return Response.badRequest(result.error);
            }

            return Response.ok(result.getValue());
        } catch (error) {
            return Response.serverError();
        }
    }
}