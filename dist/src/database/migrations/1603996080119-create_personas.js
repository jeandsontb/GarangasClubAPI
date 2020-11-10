"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createPersonas1603996080119 = void 0;
const typeorm_1 = require("typeorm");
class createPersonas1603996080119 {
    async up(queryRunner) {
        await queryRunner.createTable(new typeorm_1.Table({
            name: 'personas',
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
                    name: 'avatar',
                    type: 'varchar',
                }
            ]
        }));
    }
    async down(queryRunner) {
        await queryRunner.dropTable('personas');
    }
}
exports.createPersonas1603996080119 = createPersonas1603996080119;
