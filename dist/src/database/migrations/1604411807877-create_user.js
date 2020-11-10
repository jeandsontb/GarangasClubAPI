"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createUser1604411807877 = void 0;
const typeorm_1 = require("typeorm");
class createUser1604411807877 {
    async up(queryRunner) {
        await queryRunner.createTable(new typeorm_1.Table({
            name: 'user',
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
                    name: 'username',
                    type: 'varchar',
                },
            ]
        }));
    }
    async down(queryRunner) {
        await queryRunner.dropTable('user');
    }
}
exports.createUser1604411807877 = createUser1604411807877;
