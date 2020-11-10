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
const Historic_1 = __importDefault(require("../models/Historic"));
const historic_view_1 = __importDefault(require("../views/historic_view"));
exports.default = {
    async index(req, res) {
        const historicRepository = typeorm_1.getRepository(Historic_1.default);
        const result = await historicRepository.find();
        return res.status(200).json(historic_view_1.default.renderMany(result));
    },
    async update(req, res) {
        const { title, description, image, } = req.body;
        const historicRepository = typeorm_1.getRepository(Historic_1.default);
        const { id } = req.params;
        const data = {
            title,
            description,
            image,
        };
        const schema = Yup.object().shape({
            title: Yup.string().required(),
            description: Yup.string().required(),
            image: Yup.string().required(),
        });
        await schema.validate(data, {
            abortEarly: false,
        });
        const result = historicRepository.create(data);
        await historicRepository.update(id, data);
        return res.status(200).json(result);
    },
    async create(req, res) {
        const { title, description, image } = req.body;
        const historicRepository = typeorm_1.getRepository(Historic_1.default);
        const data = {
            title,
            description,
            image,
        };
        const schema = Yup.object().shape({
            title: Yup.string().required(),
            description: Yup.string().required(),
            image: Yup.string().required(),
        });
        await schema.validate(data, {
            abortEarly: false,
        });
        const result = historicRepository.create(data);
        await historicRepository.save(result);
        return res.status(201).json(result);
    }
};
