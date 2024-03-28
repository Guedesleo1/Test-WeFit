import { MigrationInterface, QueryRunner, Table, TableForeignKey } from "typeorm";

export class CreateTableUsers1711579664455 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(new Table({
            name: "users",
            columns: [
                {
                    name: "id",
                    type: "varchar",
                    length: '100',
                    isNullable: false,
                    isPrimary: true,
                    isUnique: true,
                },
                {
                    name: "name",
                    type: "varchar",
                    length: '100',
                },
                {
                    name: "document_type",
                    type: "varchar",
                    length: '50',
                },
                {
                    name: "document",
                    type: "varchar",
                },
                {
                    name: "telephone",
                    type: "varchar", 
                    isNullable: true,
                },
                {
                    name: "cellphone",
                    type: "varchar",
                },
                {
                    name: "zip_code",
                    type: "varchar",
                    isNullable: false,
                },
                {
                    name: "email",
                    type: "varchar",
                    length: '255',
                },
                {
                    name: "address_number",
                    type: "varchar",
                },
                {
                    name: "complement",
                    type: "varchar",
                    isNullable: true,
                },
                {
                    name: "created_at",
                    type: "timestamp",
                    default: "CURRENT_TIMESTAMP",
                }
            ]
        }));

        await queryRunner.createForeignKey('users', new TableForeignKey({
            columnNames: ['zip_code'],
            referencedColumnNames: ['zip_code_id'],
            referencedTableName: 'address',
            name: 'fk_users_address_zip_code',
        }));
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropForeignKey("users", "fk_users_address_zip_code");
        await queryRunner.dropTable("users", true);
    }

}
