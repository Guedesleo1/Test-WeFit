import { LoginDomain } from "../../domain/entities/loginDomain";
export interface LoginRepository {
    create(login: any): Promise<any>;
    exists({ email }: { email: string }): Promise<boolean>;
    findByEmail(email: string): Promise<LoginDomain | null>;
}