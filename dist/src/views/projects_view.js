"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const images_view_1 = __importDefault(require("./images_view"));
exports.default = {
    render(project) {
        return {
            id: project.id,
            name: project.name,
            title: project.title,
            description: project.description,
            future_projects: project.future_projects,
            images: images_view_1.default.renderMany(project.images),
        };
    },
    renderMany(projects) {
        return projects.map(project => this.render(project));
    }
};
