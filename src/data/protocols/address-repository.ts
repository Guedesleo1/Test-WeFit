export interface IAddressRepository {
    create(login: any): Promise<any>;
}