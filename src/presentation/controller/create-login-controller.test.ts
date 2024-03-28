import { Result } from "../../data/helpers/result";
import { ICreateLoginUseCase, IResponseCreateLogin, loginCreateDTO } from "../../domain/usecases/Icreate-login-usecase";
import { Controller } from "../protocols/controller";
import { HttpRequest } from "../protocols/controller/http";
import { CreateLoginController } from "./create-login-controller";


interface SutType {
    createLoginStub: ICreateLoginUseCase;
    sut: Controller;
}

const makeCreateLogin = (): ICreateLoginUseCase => {
    class CreateLoginStub implements ICreateLoginUseCase {
        async create(login: loginCreateDTO): Promise<Result<IResponseCreateLogin>> {
            return Result.ok<any>({
                userId: String(Math.floor(Math.random() * 10)),
                email: login.email,
                name: login.name,
                password: login.password,
            });
        }
    }

    return new CreateLoginStub();
};
const makeSut = (): SutType => {
    const createLoginStub = makeCreateLogin();
    const sut = new CreateLoginController(createLoginStub);

    return {
        sut,
        createLoginStub,
    };
};

describe("Create Login Controller", () => {
    it("should return badRequest if body not send", async () => {
        const { sut } = makeSut();
        const response = await sut.handle({});

        expect(response).toBeTruthy();
        expect(response).toHaveProperty("statusCode");
        expect(response.statusCode).toBe(400);
        expect(response).toHaveProperty("body");
        expect(response.body).toHaveProperty("error");
        expect(response.body.error).toHaveProperty("field");
        expect(response.body.error.field).toEqual("body");
    });
    it("should return badRequest if not email is provided", async () => {
        const { sut } = makeSut();
        const httpRequest: HttpRequest = {
            body: {
                name: "Any Name",
                password: "any_password",
            },
        };
        const response = await sut.handle(httpRequest);

        expect(response).toBeTruthy();
        expect(response).toHaveProperty("statusCode");
        expect(response.statusCode).toBe(400);

        expect(response).toHaveProperty("body");
        expect(response.body).toHaveProperty("error");
        expect(response.body.error).toHaveProperty("field");
        expect(response.body.error.field).toEqual("email");
    });
    it("should return badRequest if not name is provided", async () => {
        const { sut } = makeSut();
        const httpRequest: HttpRequest = {
            body: {
                email: "anyMail@mail.com",
                password: "any_password",
            },
        };
        const response = await sut.handle(httpRequest);

        expect(response).toBeTruthy();
        expect(response).toHaveProperty("statusCode");
        expect(response.statusCode).toBe(400);
        expect(response).toHaveProperty("body");
        expect(response.body).toHaveProperty("error");
        expect(response.body.error).toHaveProperty("field");
        expect(response.body.error.field).toEqual("name");
    });
    it("should return badRequest if not password is provided", async () => {
        const { sut } = makeSut();
        const httpRequest: HttpRequest = {
            body: {
                name: "Any Name",
                email: "anyMail@mail.com",
            },
        };
        const response = await sut.handle(httpRequest);

        expect(response).toBeTruthy();
        expect(response).toHaveProperty("statusCode");
        expect(response.statusCode).toBe(400);
        expect(response).toHaveProperty("body");
        expect(response.body).toHaveProperty("error");
        expect(response.body.error).toHaveProperty("field");
        expect(response.body.error.field).toEqual("password");
    });
    it("should return serverError if CreateLogin throws", async () => {
        const { sut, createLoginStub } = makeSut();
        jest.spyOn(createLoginStub, "create").mockImplementationOnce(() =>
            Promise.reject()
        );
        const httpRequest: HttpRequest = {
            body: {
                name: "Any Name",
                email: "anyMail@mail.com",
                password: "any_password",
            },
        };
        const response = await sut.handle(httpRequest);

        expect(response).toBeTruthy();
        expect(response).toHaveProperty("statusCode");
        expect(response.statusCode).toBe(500);

        expect(response).toHaveProperty("body");
        expect(response.body).toHaveProperty("error");
        expect(response.body.error).toEqual("Internal Server Error");
    });
    it("should return badRequest if CreateLogin throws", async () => {
        const { sut, createLoginStub } = makeSut();
        jest.spyOn(createLoginStub, "create").mockImplementationOnce(() =>
            Promise.resolve(Result.fail("User already exists"))
        );
        const httpRequest: HttpRequest = {
            body: {
                name: "Any Name",
                email: "anyMail@mail.com",
                password: "any_password",
            },
        };
        const response = await sut.handle(httpRequest);

        expect(response).toBeTruthy();
        expect(response).toHaveProperty("statusCode");
        expect(response.statusCode).toBe(400);

        expect(response).toHaveProperty("body");
        expect(response.body).toHaveProperty("error");
        expect(response.body.error).toEqual("User already exists");
    });
    it("should call CreateLogin with correct values", async () => {
        const { sut, createLoginStub } = makeSut();
        const createUserSpy = jest.spyOn(createLoginStub, "create");
        const httpRequest: HttpRequest = {
            body: {
                name: "Any Name",
                email: "anyMail@mail.com",
                password: "any_password",
            },
        };

        await sut.handle(httpRequest);
        expect(createUserSpy).toBeCalledWith({
            name: "Any Name",
            email: "anyMail@mail.com",
            password: "any_password",
        });
    });
    it("should return login on success", async () => {
        const { sut } = makeSut();
        const httpRequest: HttpRequest = {
            body: {
                name: "Any Name",
                email: "anyMail@mail.com",
                password: "any_password",
            },
        };
        const response = await sut.handle(httpRequest);

        expect(response).toBeTruthy();
        expect(response).toHaveProperty("statusCode");
        expect(response.statusCode).toBe(200);
        expect(response).toHaveProperty("body");
        expect(response.body).toHaveProperty("data");
        expect(response.body.data).toHaveProperty("userId");
        expect(response.body.data).toHaveProperty("email");
        expect(response.body.data).toHaveProperty("name");
        expect(response.body.data).toHaveProperty("password");
    });
});