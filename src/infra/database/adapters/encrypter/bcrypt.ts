
import { compare, hash } from "bcrypt";
import { Encrypter } from "../../../../data/protocols/encrypter";

export class Bcrypt implements Encrypter {
    async hash(password: string): Promise<string> {
        return hash(password, 12);
    }
    async compare({
        password,
        hash,
    }: {
        password: string;
        hash: string;
    }): Promise<boolean> {
        return compare(password, hash);
    }
}