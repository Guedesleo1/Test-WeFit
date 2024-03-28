import { LoginDomain } from "../../../domain/entities/login-domain";
import { ICreateLoginUseCase } from "../../../domain/usecases/Icreate-login-usecase";
import { Encrypter } from "../../protocols/encrypter";
import { IdGenerator } from "../../protocols/id-generator";
import { LoginRepository } from "../../protocols/login-repository";
import { CreateLoginUseCase } from "./create-login-usecase";

interface SutType {
    idGeneratorStub: IdGenerator;
    encrypterStub: Encrypter;
    loginRepositoryStub: LoginRepository;
    sut: ICreateLoginUseCase;
}
const makeIdGenerate = (): IdGenerator => {
    class IdGeneratorStub implements IdGenerator {
        random() {
            return '12321313131'
        }
    }
    return new IdGeneratorStub();
};

const makeLoginRepository = (): LoginRepository => {
    class LoginRepositoryStub implements LoginRepository {
    create(login: any): Promise<any>{
        return Promise.resolve({
            name: "Leonardo",
            email: "leonardo@testeWefit.com.br",
            password: "123456",
        });
    }
    exists({ email }: { email: string }): Promise<boolean>{
        return  new Promise((resolve) => resolve(false))
    }
    findByEmail(email: string): Promise<LoginDomain | null>{
        return Promise.resolve({    
            name: "Leonardo",
            email: "leonardo@testeWefit.com.br",
            password: "123456"
    });
    }
    
    }
    return new LoginRepositoryStub();
};

const makeEncrypter = (): Encrypter => {
    class EncrypterStub implements Encrypter {
         hash(password: string): Promise<string> {
            return new Promise((resolve) => resolve('1$343421'));
         }
         compare({
            password,
            hash,
        }: {
            password: string;
            hash: string;
        }): Promise<boolean>{
            return new Promise((resolve) => resolve(true));
        }
         
    }
    return new EncrypterStub();
};


const makeSut = (): SutType => {
    const idGeneratorStub = makeIdGenerate();
    const encrypterStub = makeEncrypter();
    const loginRepositoryStub = makeLoginRepository();

    const sut = new CreateLoginUseCase({
        loginRepo: loginRepositoryStub, 
        encrypter: encrypterStub, 
        idGenerator: idGeneratorStub
    });

    return {
        sut,
        idGeneratorStub,
        encrypterStub,
        loginRepositoryStub
    };
};

describe("Create Login UseCase", () => {
    it('Should be idGeneratorStub.random to be called with correct params', async () => {
        const { idGeneratorStub, sut } = makeSut();
   
        const idGeneratorSpy = jest.spyOn(idGeneratorStub, 'random')
   
         await sut.create({
               name: "Leonardo",
               email: "leonardo@testeWefit.com.br",
               password: "123456"
         })
        
         expect(idGeneratorSpy).toHaveBeenCalledTimes(1);
    });

    it('Should be encrypterStub.hash to be called with correct params', async () => {
        const { encrypterStub, sut } = makeSut();
   
        const encrypterSpy = jest.spyOn(encrypterStub, 'hash')
   
         await sut.create({
               name: "Leonardo",
               email: "leonardo@testeWefit.com.br",
               password: "123456"
         })
        
         expect(encrypterSpy).toHaveBeenCalledTimes(1);
         expect(encrypterSpy).toHaveBeenCalledWith('123456')
    });

   it('Should be loginRepositoryStub.exists to be called with correct params', async () => {
     const { loginRepositoryStub, sut } = makeSut();

     const loginRepositorySpy = jest.spyOn(loginRepositoryStub, 'exists')

      await sut.create({
            name: "Leonardo",
            email: "leonardo@testeWefit.com.br",
            password: "123456"
      })
     
      expect(loginRepositorySpy).toHaveBeenCalledTimes(1);
      expect(loginRepositorySpy).toHaveBeenCalledWith({"email": "LEONARDO@TESTEWEFIT.COM.BR"})
   });

   it('Should be loginRepositoryStub.exists, login exists', async () => {
    const { loginRepositoryStub, sut } = makeSut();

    jest.spyOn(loginRepositoryStub, 'exists').mockImplementationOnce(() => {
       return Promise.resolve(true);
   });
    
    const response = await sut.create({
           name: "Leonardo",
           email: "leonardo@testeWefit.com.br",
           password: "123456"
     })

     expect(response.isSuccess).toBeFalsy()
     expect(response.isFailure).toBeTruthy()
     expect(response.error).toEqual('User already exists')
  });


  it('Should be loginRepositoryStub.create to be called with correct params', async () => {
    const { loginRepositoryStub, sut } = makeSut();

    const loginRepositorySpy = jest.spyOn(loginRepositoryStub, 'create')

     await sut.create({
           name: "Leonardo",
           email: "leonardo@testeWefit.com.br",
           password: "123456"
     })
    
     expect(loginRepositorySpy).toHaveBeenCalledTimes(1);
     expect(loginRepositorySpy).toHaveBeenCalledWith({
        "email": "leonardo@testeWefit.com.br",
        "name": "Leonardo",
        "password": "1$343421",
        "userId": "12321313131",
    })
  });
});