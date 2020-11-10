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
const Event_1 = __importDefault(require("../models/Event"));
const events_view_1 = __importDefault(require("../views/events_view"));
exports.default = {
    async index(req, res) {
        const eventRepository = typeorm_1.getRepository(Event_1.default);
        const data = await eventRepository.find();
        return res.status(201).json(events_view_1.default.renderMany(data));
    },
    async show(req, res) {
        const { id } = req.params;
        const eventRepository = typeorm_1.getRepository(Event_1.default);
        const data = await eventRepository.findOneOrFail(id);
        return res.status(201).json(events_view_1.default.render(data));
    },
    async delete(req, res) {
        const { id } = req.params;
        const eventRepository = typeorm_1.getRepository(Event_1.default);
        await eventRepository.delete(id);
        return res.status(201).json({ message: 'Sucesso' });
    },
    async create(req, res) {
        const { title, description, date, } = req.body;
        const eventRepository = typeorm_1.getRepository(Event_1.default);
        const requestImage = req.file;
        const img = requestImage.filename;
        const data = {
            img,
            title,
            description,
            date,
        };
        const schema = Yup.object().shape({
            img: Yup.string().required(),
            title: Yup.string().required(),
            description: Yup.string().required(),
            date: Yup.string().required(),
        });
        await schema.validate(data, {
            abortEarly: false,
        });
        const result = eventRepository.create(data);
        await eventRepository.save(result);
        return res.status(201).json(result);
    }
};
