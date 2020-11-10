"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = {
    render(historic) {
        return {
            id: historic.id,
            title: historic.title,
            description: historic.description,
            url: historic.image,
        };
    },
    renderMany(historic) {
        return historic.map(e => this.render(e));
    }
};
