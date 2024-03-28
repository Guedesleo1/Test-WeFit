export interface IUserRepository {
    create(user: any): Promise<any>;
}