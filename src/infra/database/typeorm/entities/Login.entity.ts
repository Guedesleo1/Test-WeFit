import { EntitySchema, EntitySchemaOptions } from "typeorm";
import { LoginDomain } from "../../../../domain/entities/loginDomain";

const loginSchema: EntitySchemaOptions<LoginDomain> = {
    name: "login",
    columns: {
        id: {
            type: "uuid",
            primary: true,
            nullable: false,
        },
        email: {
            type: "varchar",
            unique: true,
            length: 200,
        },
        name: {
            type: "varchar",
            length: 200,
            nullable: false,
        },
        password: {
            type: "varchar",
            length: 350,
            nullable: false,
        },
    },
    indices: [
        {
            columns: ["email"],
            name: "login_email_key",
            unique: true,
        },
    ],
};

export const LoginEntity = new EntitySchema<LoginDomain>(loginSchema);