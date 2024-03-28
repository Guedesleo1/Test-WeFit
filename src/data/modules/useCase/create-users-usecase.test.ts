import { ICreateUserUseCase } from "../../../domain/usecases/Icreate-users-usecase";
import { ViaCEPResponse } from "../../../infra/database/adapters/viacep/via-cep";
import { IAddressRepository } from "../../protocols/address-repository";
import { IUserRepository } from "../../protocols/user-repository";
import { IViaCep } from "../../protocols/viaCep";
import { CreateUserUseCase } from "./create-users-usecase";

interface SutType {
    userRepositoryStub: IUserRepository;
    addressRepositoryStub: IAddressRepository;
    viaCepStub: IViaCep;
    sut: ICreateUserUseCase;
}

const makeUserRepository = (): IUserRepository => {
    class UserRepositoryStub implements IUserRepository {
    create(users: any): Promise<any>{
        return Promise.resolve({
            id: 'fa13da30-b732-4666-bf43-91717a184ec9',
            name: 'Leonardo',
            documentType: 'Pessoa Física',
            document: 'leonardo@gmail.com.br',
            telephone: '39824587',
            cellphone: '985749658',
            zipCode: '02871000',
            email: 'leonardo@gmail.com.br',
            addressNumber: '179',
            complement: '1'
        });
    }    
    }
    return new UserRepositoryStub();
};

const makeViaCep = (): IViaCep => {
    class ViaCepStub implements IViaCep {
        getAddressByCEP(zipCode: string): Promise<ViaCEPResponse> {
            return new Promise((resolve) => resolve({  
                "zipCodeId": "01001000",
                "publicPlace": "Praça da Sé",
                "complement": "lado ímpar",
                "neighborhood": "Sé",
                "city": "São Paulo",
                "state": "SP"
           }));
         }         
    }
    return new ViaCepStub();
};

const makeAddressRepository = (): IAddressRepository => {
    class AddressRepositoryStub implements IAddressRepository {
    create(address: any): Promise<any>{
        return Promise.resolve({  
            "zipCodeId": "01001000",
            "publicPlace": "Praça da Sé",
            "complement": "lado ímpar",
            "neighborhood": "Sé",
            "city": "São Paulo",
            "state": "SP"
       });
    }    
    }
    return new AddressRepositoryStub();
};


const makeSut = (): SutType => {
    const viaCepStub = makeViaCep();
    const userRepositoryStub = makeUserRepository();
    const addressRepositoryStub = makeAddressRepository();
    
    const sut = new CreateUserUseCase({
      viaCep: viaCepStub,
      userRepo: userRepositoryStub,
      addressRepo: addressRepositoryStub,
    });

    return {
        sut,
        userRepositoryStub,
        addressRepositoryStub,
        viaCepStub
    };
};

describe("Create User UseCase", () => {
    it('Should be viaCepStub.getAddressByCEP to be called with correct params', async () => {
        const { viaCepStub, sut } = makeSut();
   
        const viaCepSpy = jest.spyOn(viaCepStub, 'getAddressByCEP')
   
         await sut.create({
            id: 'fa13da30-b732-4666-bf43-91717a184ec9',
            email: 'leonardo@gmail.com.br',
            name: 'Leonardo',
            documentType: 'Pessoa Física',
            document: 'leonardo@gmail.com.br',
            telephone: '39824587',
            cellphone: '985749658',
            zipCode: '02871000',
            addressNumber: '179',
            complement: '1'
         })
        
         expect(viaCepSpy).toHaveBeenCalledTimes(1);
         expect(viaCepSpy).toHaveBeenCalledWith("02871000");
    });

    it('Should be userRepositorySpy.create to be called with correct params', async () => {
        const { userRepositoryStub, sut } = makeSut();
   
        const userRepositorySpy = jest.spyOn(userRepositoryStub, 'create')
   
         await sut.create({
            id: 'fa13da30-b732-4666-bf43-91717a184ec9',
            email: 'leonardo@gmail.com.br',
            name: 'Leonardo',
            documentType: 'Pessoa Física',
            document: 'leonardo@gmail.com.br',
            telephone: '39824587',
            cellphone: '985749658',
            zipCode: '02871000',
            addressNumber: '179',
            complement: '1'
         })
        
         expect(userRepositorySpy).toHaveBeenCalledTimes(1);
         expect(userRepositorySpy).toHaveBeenCalledWith({
            "addressNumber": "179", 
            "cellphone": "985749658", 
            "complement": "1",
             "document": "leonardo@gmail.com.br", 
             "documentType": "Pessoa Física", 
             "email": "leonardo@gmail.com.br", 
             "id": "fa13da30-b732-4666-bf43-91717a184ec9",
              "name": "Leonardo", 
              "telephone": "39824587", 
              "zipCode": "02871000"
            });
    });

    it('Should be addressRepositoryStub.create to be called with correct params', async () => {
        const { addressRepositoryStub, sut } = makeSut();
   
        const addressRepositorySpy = jest.spyOn(addressRepositoryStub, 'create')
   
         await sut.create({
            id: 'fa13da30-b732-4666-bf43-91717a184ec9',
            email: 'leonardo@gmail.com.br',
            name: 'Leonardo',
            documentType: 'Pessoa Física',
            document: 'leonardo@gmail.com.br',
            telephone: '39824587',
            cellphone: '985749658',
            zipCode: '02871000',
            addressNumber: '179',
            complement: '1'
         })
        
         expect(addressRepositorySpy).toHaveBeenCalledTimes(1);
         expect(addressRepositorySpy).toHaveBeenCalledWith({"city": "São Paulo", "complement": "lado ímpar", "neighborhood": "Sé", "publicPlace": "Praça da Sé", "state": "SP", "zipCodeId": "01001000"});
    });
});