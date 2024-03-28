import { AddressEntity } from "./typeorm/entities/address.entity";
import { LoginEntity } from "./typeorm/entities/login.entity";
import { UserEntity } from "./typeorm/entities/user.entity";

export const testConnection = {
    type: "sqlite",
    host: "localhost",
    port: 3308,
    username: "root",
    password:  'senha_root_123',
    database: 'wefit-test',
    entities: [LoginEntity, AddressEntity, UserEntity],
    migrations: [`${__dirname}/typeorm/migrations/*.ts`],
};

export const mysqlConnection = {
    type: "mysql",
    host: "localhost",
    port: 3306,
    username: "root",
    password:  'senha_root_123',
    database: 'wefit',
    entities: [LoginEntity, AddressEntity, UserEntity],
    migrations: [`${__dirname}/typeorm/migrations/*.ts`],
};