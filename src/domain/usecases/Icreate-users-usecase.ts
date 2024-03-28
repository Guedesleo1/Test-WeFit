import { Result } from "../../data/helpers/result";

export interface userCreateDTO{
    id: string,
    email: string,
    name: string,
    documentType: string,
    document: string,
    telephone: string,
    cellphone: string,
    zipCode: string,
    addressNumber: string,
    complement: string
}


export interface ICreateUserUseCase {
    create: (user: userCreateDTO) => Promise<Result<any>>
}