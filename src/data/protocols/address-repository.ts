export interface IAddressRepository {
    create(address: any): Promise<any>;
}