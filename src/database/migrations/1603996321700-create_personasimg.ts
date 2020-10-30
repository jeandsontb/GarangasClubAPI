import {MigrationInterface, QueryRunner, Table} from "typeorm";

export class createPersonasimg1603996321700 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
      await queryRunner.createTable(new Table({
        name: "photopersonas",
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
            name: 'path',
            type: 'varchar',
          },
          {
            name: 'persona_id',
            type: 'integer',
            unsigned: true,
          }
        ],
        foreignKeys: [
          {
            name: 'ImagePersona',
            columnNames: ['persona_id'],
            referencedTableName: 'personas',
            referencedColumnNames: ['id'],
            onUpdate: 'CASCADE',
            onDelete: 'CASCADE',
          }
        ]
      }))
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
      await queryRunner.dropTable('photopersonas');
    }

}
