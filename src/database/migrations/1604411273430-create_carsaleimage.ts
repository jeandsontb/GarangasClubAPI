import {MigrationInterface, QueryRunner, Table} from "typeorm";

export class createCarsaleimage1604411273430 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
      await queryRunner.createTable(new Table({
        name: 'carsale_image',
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
            name: 'carsale_id',
            type: 'integer',
            unsigned: true,
          }
        ],
        foreignKeys: [
          {
            name: 'ImageCarSale',
            columnNames: ['carsale_id'],
            referencedTableName: 'carsale',
            referencedColumnNames: ['id'],
            onUpdate: 'CASCADE',
            onDelete: 'CASCADE',
          }
        ]
      }));
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
      await queryRunner.dropTable('carsale_image');
    }

}
