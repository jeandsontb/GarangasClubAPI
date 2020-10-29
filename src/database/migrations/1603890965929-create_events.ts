import {MigrationInterface, QueryRunner, Table} from "typeorm";

export class createEvents1603890965929 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
      await queryRunner.createTable(new Table({
        name: 'events',
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
            name: 'img',
            type: 'text',
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
            name: 'date',
            type: 'varchar',
          },
        ]
      }))

    }

    public async down(queryRunner: QueryRunner): Promise<void> {
      await queryRunner.dropTable('events');
    }

}
