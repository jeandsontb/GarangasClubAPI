"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createCarsaleimage1604411273430 = void 0;
const typeorm_1 = require("typeorm");
class createCarsaleimage1604411273430 {
    async up(queryRunner) {
        await queryRunner.createTable(new typeorm_1.Table({
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
    async down(queryRunner) {
        await queryRunner.dropTable('carsale_image');
    }
}
exports.createCarsaleimage1604411273430 = createCarsaleimage1604411273430;
