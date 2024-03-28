import { LoginDomain } from "../../../domain/entities/login-domain";
import { ICreateTokenUseCase } from "../../../domain/usecases/Icrate-token-usecase";
import { Encrypter } from "../../protocols/encrypter";
import { ITokenGenerator } from "../../protocols/jwt";
import { LoginRepository } from "../../protocols/login-repository";
import { CreateTokenUseCase } from "./create-token-usecase";

interface SutType {
    jwtStub: ITokenGenerator;
    encrypterStub: Encrypter;
    loginRepositoryStub: LoginRepository;
    sut: ICreateTokenUseCase;
}
const makeJwt = (): ITokenGenerator => {
    class JwtStub implements ITokenGenerator {
        generate(payload: any): string{
            return '1234#5412'
        }
    }
    return new JwtStub();
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
    const jwtStub = makeJwt();
    const encrypterStub = makeEncrypter();
    const loginRepositoryStub = makeLoginRepository();

    const sut = new CreateTokenUseCase({
        loginRepo: loginRepositoryStub, 
        encrypter: encrypterStub, 
        jwt: jwtStub
    });

    return {
        sut,
        jwtStub,
        encrypterStub,
        loginRepositoryStub
    };
};

describe("Create Token UseCase", () => {
    it('Should be loginRepositoryStub.findByEmail to be called with correct params', async () => {
        const { loginRepositoryStub , sut } = makeSut();
   
        const loginRepositorySpy = jest.spyOn(loginRepositoryStub, 'findByEmail')
   
         await sut.create({
               email: "leonardo@testeWefit.com.br",
               password: "123456"
         })
        
         expect(loginRepositorySpy).toHaveBeenCalledTimes(1);
         expect(loginRepositorySpy).toHaveBeenCalledWith("LEONARDO@TESTEWEFIT.COM.BR");
    });

    it('Should be loginRepositoryStub.findByEmail to be not email exists', async () => {
        const { loginRepositoryStub , sut } = makeSut();
   
        jest.spyOn(loginRepositoryStub, 'findByEmail').mockImplementationOnce(() => {
            return Promise.resolve(null);
        });
   
         const response = await sut.create({
               email: "leonardo@testeWefit.com.br",
               password: "123456"
         })
        
         expect(response.isSuccess).toBeFalsy()
         expect(response.isFailure).toBeTruthy()
         expect(response.error).toEqual('Email invalid')
    });

    it('Should be encrypterStub.compare to be called with correct params', async () => {
        const { encrypterStub , sut } = makeSut();
   
        const encrypterSpy = jest.spyOn(encrypterStub, 'compare')
   
         await sut.create({
               email: "leonardo@testeWefit.com.br",
               password: "123456"
         })
        
         expect(encrypterSpy).toHaveBeenCalledTimes(1);
         expect(encrypterSpy).toHaveBeenCalledWith({"hash": "123456", "password": "123456"});
    });

    it('Should be encrypterStub.compare isMatch false', async () => {
        const { encrypterStub , sut } = makeSut();
   
        jest.spyOn(encrypterStub, 'compare').mockImplementationOnce(() => {
            return Promise.resolve(false);
        });
   
         const response = await sut.create({
               email: "leonardo@testeWefit.com.br",
               password: "123456"
         })
        
         expect(response.isSuccess).toBeFalsy()
         expect(response.isFailure).toBeTruthy()
         expect(response.error).toEqual('Password invalid')
    });

    it('Should be jwtStub.generate to be called with correct params', async () => {
        const { jwtStub , sut } = makeSut();
   
        const jwtSpy = jest.spyOn(jwtStub, 'generate')
   
         await sut.create({
               email: "leonardo@testeWefit.com.br",
               password: "123456"
         })
        
         expect(jwtSpy).toHaveBeenCalledTimes(1);
         expect(jwtSpy).toHaveBeenCalledWith({"email": "leonardo@testeWefit.com.br","name": "Leonardo", "password": "123456"});
    });
});