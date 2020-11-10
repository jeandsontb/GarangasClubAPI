"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = {
    render(linkmovie) {
        return {
            id: linkmovie.id,
            title: linkmovie.title,
            url: linkmovie.url,
        };
    },
    renderMany(linkmovie) {
        return linkmovie.map(e => this.render(e));
    }
};
