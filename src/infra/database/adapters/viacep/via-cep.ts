import axios, { AxiosResponse } from 'axios';
import { IViaCep } from '../../../../data/protocols/viaCep';

export interface ViaCEPResponse {
    zipCodeId: string;
    //logradouro
    publicPlace: string;
    //complemento
    complement: string;
    //bairro
    neighborhood: string;
    //cidade
    city: string;
    //estado
    state: string;
}

export class ViaCEP implements IViaCep{
    private baseUrl: string;

    constructor() {
        this.baseUrl = 'https://viacep.com.br/ws/';
    }

    async getAddressByCEP(zipCode: string): Promise<ViaCEPResponse> {
        try {
            const response = await axios.get(`${this.baseUrl}${zipCode}/json`);
            
            return {
                zipCodeId: response.data.cep.replace("-", ""),
                publicPlace: response.data.logradouro,
                complement: response.data.complemento,
                neighborhood: response.data.bairro,
                city: response.data.localidade,
                state: response.data.uf,
            };
        } catch (error) {
            throw new Error();
        }
    }
}
