import { MigrationInterface, QueryRunner, Table, TableForeignKey } from "typeorm";

export class CreateTableAddress1711565246862 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(new Table({
            name: "address",
            columns: [
                {
                    name: "zip_code_id",
                    type: "varchar",
                    isPrimary: true,
                    isNullable: false
                },
                {
                    name: "neighborhood",
                    type: "varchar",
                },
                {
                    name: "state",
                    type: "varchar",
                },
                {
                    name: "city",
                    type: "varchar",
                },
                {
                    name: "public_place",
                    type: "varchar",
                }
            ]
        }));
        
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable("address", true);
    }

}