import { Result } from "../../data/helpers/result";

export interface loginCreateDTO{
  name: string,
  email:string,
  password: string
}

export interface IResponseCreateLogin{
    name: string,
    email:string,
    password: string;
    userId: string
  }

export interface ICreateLoginUseCase {
    create: (user: loginCreateDTO) => Promise<Result<IResponseCreateLogin>>