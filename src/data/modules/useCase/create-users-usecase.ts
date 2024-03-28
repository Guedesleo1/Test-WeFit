import { Result } from "../../helpers/result";
import { IAddressRepository } from "../../protocols/address-repository";
import { IUserRepository } from "../../protocols/user-repository";
import { IViaCep } from "../../protocols/viaCep";

interface CreateUserConstructor {
    viaCep: IViaCep,
    addressRepo: IAddressRepository,
    userRepo: IUserRepository
}

export class CreateUserUseCase {
    private readonly viaCep: IViaCep;
    private readonly addressRepo: IAddressRepository;
    private readonly userRepo: IUserRepository;

    constructor({ viaCep, addressRepo, userRepo }: CreateUserConstructor) {
        this.viaCep = viaCep,
        this.addressRepo = addressRepo,
        this.userRepo = userRepo
    }

    async create(user: any): Promise<Result<any>> {
        try {
            const addressCep = await this.viaCep.getAddressByCEP(user.cep);

            await this.addressRepo.create(addressCep)
            const userCreate = await this.userRepo.create(user);
    
            const users = {
                ...userCreate,
                address: {
                    neighborhood: addressCep.neighborhood,
                    state: addressCep.state,
                    city: addressCep.city,
                    publicPlace: addressCep.publicPlace,
                }
            };
            return Result.ok(users)   
        } catch (error) {
            if (error instanceof Error) {
                return Result.fail('Erro ao obter endereço do CEP');
            } 

            return Result.fail('Server Error');
        }
    }
}