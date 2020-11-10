"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createCarsale1604410846749 = void 0;
const typeorm_1 = require("typeorm");
class createCarsale1604410846749 {
    async up(queryRunner) {
        await queryRunner.createTable(new typeorm_1.Table({
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
    async down(queryRunner) {
        await queryRunner.dropTable('carsale');
    }
}
exports.createCarsale1604410846749 = createCarsale1604410846749;
