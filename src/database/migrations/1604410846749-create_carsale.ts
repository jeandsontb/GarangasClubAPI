import {MigrationInterface, QueryRunner, Table} from "typeorm";

export class createCarsale1604410846749 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {

      await queryRunner.createTable(new Table({
        name: 'carsale',
        columns: [
          {
            name: 'id',
            type: 'integer',
            unsigned: true,
            isPrimary: true,
            isGenerated: true,
            generationStrategy: 'increment',
          },
          {
            name: 'name',
            type: 'varchar',
          },
          {
            name: 'title',
            type: 'varchar',
          },
          {
            name: 'description',
            type: 'text',
          },
          {
            name: 'phone',
            type: 'varchar',
          },
          {
            name: 'price',
            type: 'varchar',
          },
          {
            name: 'cover',
            type: 'varchar',
          }
        ]
      }));
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
      await queryRunner.dropTable('carsale');
    }

}
