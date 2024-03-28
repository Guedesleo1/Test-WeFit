import "reflect-metadata";
import { Repository } from "typeorm";
import { dateBaseSource } from "../data-source";
import { IAddressRepository } from "../../../../data/protocols/address-repository";
import { AddressEntity } from "../entities/address.entity";
import { AddressDomain } from "../../../../domain/entities/address-domain";

export class AddressRepositoryTypeorm implements IAddressRepository {
    private readonly addressEntity: Repository<AddressDomain>;
    constructor() {
        this.addressEntity = dateBaseSource.getRepository<AddressDomain>(AddressEntity)
    }
    async create(address: AddressDomain): Promise<any> {
        const addressCreate = this.addressEntity.create(address);
        await this.addressEntity.save(addressCreate);
        return addressCreate;
    }

}