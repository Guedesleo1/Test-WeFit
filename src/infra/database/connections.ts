import { AddressEntity } from "./typeorm/entities/address.entity";
import { LoginEntity } from "./typeorm/entities/login.entity";
import { UserEntity } from "./typeorm/entities/user.entity";

export const testConnection = {
    type: "mysql",
    host: "localhost",
    port: process.env.MYSQLDB_PORT,
    username: "root",
    password:  Number(process.env.MYSQLDB_PASSWORD),
    database: process.env.MYSQLDB_DATABASE,
    entities: [`${__dirname}/entities/*.ts`],
    migrations: [`${__dirname}/migrations/*.ts`],
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