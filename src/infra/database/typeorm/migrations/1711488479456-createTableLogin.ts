import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class CreateTableLogin1711488479456 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
              name: 'login',
              columns: [
                {
                  name: 'email',
                  type: 'varchar',
                  length: '100',
                  isNullable: false,
                  isUnique: true,
                },
                {
                  name: 'name',
                  type: 'varchar',
                  length: '100',
                  isNullable: false,
                },
                {
                  name: 'password',
                  type: 'varchar',
                  length: '250',
                  isNullable: false,
                },
                {
                  name: 'id',
                  type: 'varchar',
                  length: '100',
                  isNullable: false,
                  isPrimary: true,
                  isUnique: true,
                },
                {
                  name: 'created_at',
                  type: 'timestamp',
                },
                {
                  name: 'updated_at',
                  type: 'timestamp',
                },
              ],
            }),
          );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable("login", true);
    }

}
