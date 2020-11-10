"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = {
    render(event) {
        return {
            id: event.id,
            url: `http://localhost:3333/uploads/${event.img}`,
            title: event.title,
            description: event.description,
            date: event.date,
        };
    },
    renderMany(event) {
        return event.map(e => this.render(e));
    }
};
