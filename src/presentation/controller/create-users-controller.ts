import { Response, Controller, HttpRequest, HttpResponse } from ".";

export class CreateUsersController implements Controller {

    constructor() { }

    async handle(httpRequest: HttpRequest): Promise<HttpResponse> {

        return Response.ok({ user: 1});
    }
}