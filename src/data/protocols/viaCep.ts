import { ViaCEPResponse } from "../../infra/database/adapters/viacep/via-cep";

export interface IViaCep {
    getAddressByCEP(zipCode: string): Promise<ViaCEPResponse>;
  }