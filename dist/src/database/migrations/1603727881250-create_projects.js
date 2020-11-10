"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createProjects1603463467610 = void 0;
const typeorm_1 = require("typeorm");
class createProjects1603463467610 {
    async up(queryRunner) {
        await queryRunner.createTable(new typeorm_1.Table({
            name: 'projects',
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
                    type: 'text'
                },
                {
                    name: 'future_projects',
                    type: 'text'
                },
            ]
        }));
    }
    async down(queryRunner) {
        await queryRunner.dropTable('projects');
    }
}
exports.createProjects1603463467610 = createProjects1603463467610;
