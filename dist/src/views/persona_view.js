"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const personaimages_view_1 = __importDefault(require("./personaimages_view"));
exports.default = {
    render(persona) {
        return {
            id: persona.id,
            name: persona.name,
            title: persona.title,
            description: persona.description,
            avatar: `http://localhost:3333/uploads/${persona.avatar}`,
            images: personaimages_view_1.default.renderMany(persona.personaImages),
        };
    },
    renderMany(persona) {
        return persona.map(e => this.render(e));
    }
};
