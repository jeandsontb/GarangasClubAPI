"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const carsaleimages_view_1 = __importDefault(require("./carsaleimages_view"));
exports.default = {
    render(carsale) {
        return {
            id: carsale.id,
            name: carsale.name,
            title: carsale.title,
            description: carsale.description,
            phone: carsale.phone,
            price: carsale.price,
            cover: `http://localhost:3333/uploads/${carsale.cover}`,
            images: carsaleimages_view_1.default.renderMany(carsale.carSaleImages),
        };
    },
    renderMany(carsales) {
        return carsales.map(e => this.render(e));
    }
};
