import {MigrationInterface, QueryRunner, Table} from "typeorm";

export class createLinkmovie1603996842992 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
      await queryRunner.createTable(new Table({
        name: "link_movie",
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
            name: 'url',
            type: 'varchar',
          }
        ]
      }));
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
      await queryRunner.dropTable('link_movie');
    }

}
