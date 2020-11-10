"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const typeorm_1 = require("typeorm");
const Yup = __importStar(require("yup"));
const CarSale_1 = __importDefault(require("../models/CarSale"));
const carsale_view_1 = __importDefault(require("../views/carsale_view"));
exports.default = {
    async delete(req, res) {
        const { id } = req.params;
        const carSaleRepository = typeorm_1.getRepository(CarSale_1.default);
        await carSaleRepository.delete(id);
        return res.status(200).json({ message: 'Sucesso ao deletar' });
    },
    async show(req, res) {
        const { id } = req.params;
        const carSaleRepository = typeorm_1.getRepository(CarSale_1.default);
        const result = await carSaleRepository.findOneOrFail(id, {
            relations: ['carSaleImages']
        });
        return res.status(200).json(carsale_view_1.default.render(result));
    },
    async index(req, res) {
        const carSaleRepository = typeorm_1.getRepository(CarSale_1.default);
        const result = await carSaleRepository.find({
            relations: ['carSaleImages']
        });
        return res.status(200).json(carsale_view_1.default.renderMany(result));
    },
    async update(req, res) {
        const { id } = req.params;
        const { name, title, description, phone, price } = req.body;
        const coverName = req.file;
        const cover = coverName.filename;
        const carSaleRepository = typeorm_1.getRepository(CarSale_1.default);
        const data = {
            name,
            title,
            description,
            phone,
            price,
            cover,
        };
        const schema = Yup.object().shape({
            name: Yup.string().required(),
            title: Yup.string().required(),
            description: Yup.string().required(),
            phone: Yup.string().required(),
            price: Yup.string().required(),
        });
        await schema.validate(data, {
            abortEarly: false,
        });
        await carSaleRepository.update(id, data);
        return res.status(200).json(data);
    },
    async create(req, res) {
        const { name, title, description, phone, price } = req.body;
        const carSaleRepository = typeorm_1.getRepository(CarSale_1.default);
        const requestImages = req.files;
        const cover = requestImages.cover.map((cover) => {
            return {
                cover: cover.filename.replace(/\s+/g, '-')
            };
        });
        const images = requestImages.images.map((image) => {
            return {
                path: image.filename.replace(/\s+/g, '-')
            };
        });
        const data = {
            name,
            title,
            description,
            phone,
            price,
            cover: cover[0].cover,
            carSaleImages: images,
        };
        const schema = Yup.object().shape({
            name: Yup.string().required(),
            title: Yup.string().required(),
            description: Yup.string().required(),
            phone: Yup.string().required(),
            price: Yup.string().required(),
            cover: Yup.string().required(),
            carSaleImages: Yup.array(Yup.object().shape({
                path: Yup.string().required()
            }))
        });
        await schema.validate(data, {
            abortEarly: false,
        });
        const result = carSaleRepository.create(data);
        await carSaleRepository.save(result);
        console.log(result);
        return res.status(201).json(result);
    }
};
