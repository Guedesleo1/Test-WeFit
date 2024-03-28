import { Result } from "../../data/helpers/result";
import { ICreateUserUseCase } from "../../domain/usecases/Icreate-users-usecase";
import { Controller } from "../protocols/controller";
import { HttpRequest } from "../protocols/controller/http";
import { CreateUsersController } from "./create-users-controller";


interface SutType {
    createUsersStub: ICreateUserUseCase;
    sut: Controller;
}

const makeCreateUsers = (): ICreateUserUseCase => {
    class CreateTokenStub implements ICreateUserUseCase {
        async create(users: any): Promise<Result<any>> {
            return Result.ok<any>({
                    "id": "9dc39f44-b4ed-4394-a8b9-16837b26ea2b",
                    "name": "Leonardo",
                    "documentType": true,
                    "document": "57708816076",
                    "telephone": "39824587",
                    "zipCode": "02871000",
                    "cellphone": "985749658",
                    "email": "leonardo@gmail.com.br",
                    "addressNumber": "179",
                    "complement": "1B",
                    "created_at": "2024-03-28T05:13:45.000Z",
                    "address": {
                      "neighborhood": "Jardim Ondina",
                      "state": "SP",
                      "city": "São Paulo",
                      "publicPlace": "Rua Santa Cruz do Escalvado"
                    }
            });
        }
    }

    return new CreateTokenStub();
};
const makeSut = (): SutType => {
    const createUsersStub = makeCreateUsers();
    const sut = new CreateUsersController(createUsersStub);

    return {
        sut,
        createUsersStub,
    };
};

describe("Create Users Controller", () => {
    it("should return serverError if create Users throws", async () => {
        const { sut, createUsersStub } = makeSut();
        jest.spyOn(createUsersStub, "create").mockImplementationOnce(() =>
            Promise.reject()
        );
        const httpRequest: HttpRequest = {
            body: {
                "documentType": true,
                "document": "97824952045",
                "telephone": null,
                "cellphone": "985549636",
                "zipCode": "02871000",
                "addressNumber": "179",
                "complement": null
              },
              request:{
                data:{
                    userId: "123132@@!34",
                    email: 'Leonardo1234@gmail.com',
                    name: "Leonardo"
                }
              }
        };
        const response = await sut.handle(httpRequest);

        expect(response).toBeTruthy();
        expect(response).toHaveProperty("statusCode");
        expect(response.statusCode).toBe(500);

        expect(response).toHaveProperty("body");
        expect(response.body).toHaveProperty("error");
        expect(response.body.error).toEqual("Internal Server Error");
    });
    it("should return badRequest if createUsers throws", async () => {
        const { sut, createUsersStub } = makeSut();
        jest.spyOn(createUsersStub, "create").mockImplementationOnce(() =>
            Promise.resolve(Result.fail("Erro ao obter endereço do CEP"))
        );
        const httpRequest: HttpRequest = {
            body: {
                "documentType": true,
                "document": "97824952045",
                "telephone": null,
                "cellphone": "985549636",
                "zipCode": "02871000",
                "addressNumber": "179",
                "complement": null
              },
              request:{
                data:{
                    userId: "123132@@!34",
                    email: 'Leonardo1234@gmail.com',
                    name: "Leonardo"
                }
              }
        };
        const response = await sut.handle(httpRequest);

        expect(response).toBeTruthy();
        expect(response).toHaveProperty("statusCode");
        expect(response.statusCode).toBe(400);

        expect(response).toHaveProperty("body");
        expect(response.body).toHaveProperty("error");
        expect(response.body.error).toEqual("Erro ao obter endereço do CEP");
    });
    it("should call createUsersStub with correct values", async () => {
        const { sut, createUsersStub } = makeSut();
        const createUserSpy = jest.spyOn(createUsersStub, "create");
        const httpRequest: HttpRequest = {
            body: {
                "documentType": true,
                "document": "97824952045",
                "telephone": null,
                "cellphone": "985549636",
                "zipCode": "02871000",
                "addressNumber": "179",
                "complement": null
              },
              request:{
                data:{
                    userId: "123132@@!34",
                    email: 'Leonardo1234@gmail.com',
                    name: "Leonardo"
                }
              }
        };

        await sut.handle(httpRequest);
        expect(createUserSpy).toBeCalledWith({
            addressNumber: "179",
            cellphone: "985549636",
            complement: null,
            document: "97824952045",
            documentType: "Pessoa Física",
            email: "Leonardo1234@gmail.com",
            id: "123132@@!34",
            name: "Leonardo",
            telephone: null,
            zipCode: "02871000",
        });
    });
    it("should return users on success", async () => {
        const { sut } = makeSut();
        const httpRequest: HttpRequest = {
            body: {
                "documentType": true,
                "document": "97824952045",
                "telephone": null,
                "cellphone": "985549636",
                "zipCode": "02871000",
                "addressNumber": "179",
                "complement": null
              },
              request:{
                data:{
                    userId: "123132@@!34",
                    email: 'Leonardo1234@gmail.com',
                    name: "Leonardo"
                }
              }
        };
        const response = await sut.handle(httpRequest);

        expect(response).toBeTruthy();
        expect(response).toHaveProperty("statusCode");
        expect(response.statusCode).toBe(200);
        expect(response).toHaveProperty("body");
        expect(response.body.data.value).toEqual( {"address":  {
                     "city": "São Paulo",
                     "neighborhood": "Jardim Ondina",
                     "publicPlace": "Rua Santa Cruz do Escalvado",
                     "state": "SP",
                   },
                   "addressNumber": "179",
                   "cellphone": "985749658",
                   "complement": "1B",
                   "created_at": "2024-03-28T05:13:45.000Z",
                   "document": "57708816076",
                   "documentType": true,
                   "email": "leonardo@gmail.com.br",
                   "id": "9dc39f44-b4ed-4394-a8b9-16837b26ea2b",
                   "name": "Leonardo",
                   "telephone": "39824587",
                   "zipCode": "02871000",
                 });
    });
});