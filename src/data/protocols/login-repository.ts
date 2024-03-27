import { LoginEntity } from "../../infra/database/typeorm/entities/Login.entity";

export interface LoginRepository {
    create(login: any): Promise<any>;
    exists({ email }: { email: string }): Promise<boolean>;
}