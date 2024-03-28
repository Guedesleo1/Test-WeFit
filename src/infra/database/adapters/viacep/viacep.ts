import axios, { AxiosResponse } from 'axios';

interface ViaCEPResponse {
    cepId: string;
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

export class ViaCEP {
    private baseUrl: string;

    constructor() {
        this.baseUrl = 'https://viacep.com.br/ws/';
    }

    async getAddressByCEP(cep: string): Promise<ViaCEPResponse> {
        try {
            const response = await axios.get(`${this.baseUrl}${cep}/json`);
            return {
                cepId: response.data.cep.replace("-", ""),
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
