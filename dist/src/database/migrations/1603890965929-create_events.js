"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createEvents1603890965929 = void 0;
const typeorm_1 = require("typeorm");
class createEvents1603890965929 {
    async up(queryRunner) {
        await queryRunner.createTable(new typeorm_1.Table({
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
        }));
    }
    async down(queryRunner) {
        await queryRunner.dropTable('events');
    }
}
exports.createEvents1603890965929 = createEvents1603890965929;
