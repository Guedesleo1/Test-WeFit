import { Request, Response } from "express";
import { Controller } from "../../presentation/protocols/controller";
import { HttpRequest, HttpResponse } from "../../presentation/protocols/controller/http";
export class ExpressRouteAdapter {
    static adapt(controller: Controller): any {
        return async (request: Request, response: Response) => {
            const httpRequest: HttpRequest = {
                body: request.body,
                request: request
            };
            const httpResponse: HttpResponse = await controller.handle(
                httpRequest
            );
            return response
                .status(httpResponse.statusCode)
                .json(httpResponse.body);
        };
    }
}