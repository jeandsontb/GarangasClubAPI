"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createPersonasimg1603996321700 = void 0;
const typeorm_1 = require("typeorm");
class createPersonasimg1603996321700 {
    async up(queryRunner) {
        await queryRunner.createTable(new typeorm_1.Table({
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
        }));
    }
    async down(queryRunner) {
        await queryRunner.dropTable('photopersonas');
    }
}
exports.createPersonasimg1603996321700 = createPersonasimg1603996321700;
