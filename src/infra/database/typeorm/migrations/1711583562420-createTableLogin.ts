import { MigrationInterface, QueryRunner, Table, TableForeignKey } from "typeorm";

export class CreateTableLogin1711583562420 implements MigrationInterface {

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
                  name: 'user_id',
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
              ],
            }),
          );

          await queryRunner.createForeignKey('users', new TableForeignKey({
            columnNames: ['id'],
            referencedColumnNames: ['user_id'],
            referencedTableName: 'login',
            onDelete: 'CASCADE',
            name: 'fk_users_login'
        }));
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
     await queryRunner.dropForeignKey("users", "fk_users_login");
      await queryRunner.dropTable("login", true);
    }

}
