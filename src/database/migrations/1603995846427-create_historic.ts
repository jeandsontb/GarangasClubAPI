import {MigrationInterface, QueryRunner, Table} from "typeorm";

export class createHistoric1603995846427 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {

      await queryRunner.createTable(new Table({
        name: 'historic',
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
            name: 'title',
            type: 'varchar',
          },
          {
            name: 'description',
            type: 'text',
          },
          {
            name: 'image',
            type: 'varchar',
          }
        ]
      }));
    }

    public async down(queryRunner: QueryRunner): Promise<void> {

      await queryRunner.dropTable('historic');
    }

}
