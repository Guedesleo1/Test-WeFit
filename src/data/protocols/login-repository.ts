import { LoginDomain } from "../../domain/entities/login-domain";
export interface LoginRepository {
    create(login: any): Promise<any>;
    exists({ email }: { email: string }): Promise<boolean>;
    findByEmail(email: string): Promise<LoginDomain | null>;
}