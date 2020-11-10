"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createHistoric1603995846427 = void 0;
const typeorm_1 = require("typeorm");
class createHistoric1603995846427 {
    async up(queryRunner) {
        await queryRunner.createTable(new typeorm_1.Table({
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
    async down(queryRunner) {
        await queryRunner.dropTable('historic');
    }
}
exports.createHistoric1603995846427 = createHistoric1603995846427;
