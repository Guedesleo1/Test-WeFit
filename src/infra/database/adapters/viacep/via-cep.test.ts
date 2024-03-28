
import axios from 'axios';
import { ViaCEP } from './via-cep';

jest.mock('axios');

const mockedAxios = axios as jest.Mocked<typeof axios>;

describe('ViaCEP', () => {
    let viaCEP: ViaCEP;

    beforeEach(() => {
        viaCEP = new ViaCEP();
    });
    it('should return address information for a given CEP', async () => {
        mockedAxios.get.mockResolvedValue({data:{
            "cep": "01001-000",
            "logradouro": "Praça da Sé",
            "complemento": "lado ímpar",
            "bairro": "Sé",
            "localidade": "São Paulo",
            "uf": "SP",
        }});
        const response = await viaCEP.getAddressByCEP('12345678');
        expect(response).toEqual({  
            "zipCodeId": "01001000",
            "publicPlace": "Praça da Sé",
            "complement": "lado ímpar",
            "neighborhood": "Sé",
            "city": "São Paulo",
            "state": "SP"
       });
    });

    it('should throw an error if an error occurs during the request', async () => {
        mockedAxios.get.mockRejectedValue(new Error('Request failed'))

        await expect(viaCEP.getAddressByCEP('12345678')).rejects.toThrowError();
    });
});
