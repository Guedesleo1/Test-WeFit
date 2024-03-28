export interface IUserRepository {
    create(login: any): Promise<any>;
}