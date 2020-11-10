"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createLinkmovie1603996842992 = void 0;
const typeorm_1 = require("typeorm");
class createLinkmovie1603996842992 {
    async up(queryRunner) {
        await queryRunner.createTable(new typeorm_1.Table({
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
    async down(queryRunner) {
        await queryRunner.dropTable('link_movie');
    }
}
exports.createLinkmovie1603996842992 = createLinkmovie1603996842992;
