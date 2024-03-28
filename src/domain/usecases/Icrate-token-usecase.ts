import { Result } from "../../data/helpers/result";

export interface lokenCreateDTO{
  password: string,
  email:string,
}

export interface IResponseCreateToken{
    accessToken: string,
  }

export interface ICreateTokenUseCase {
    create: (token: lokenCreateDTO) => Promise<Result<IResponseCreateToken>>;
}