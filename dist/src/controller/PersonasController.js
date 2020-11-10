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
const Persona_1 = __importDefault(require("../models/Persona"));
const persona_view_1 = __importDefault(require("../views/persona_view"));
exports.default = {
    async delete(req, res) {
        const { id } = req.params;
        const personaRepository = typeorm_1.getRepository(Persona_1.default);
        await personaRepository.delete(id);
        return res.status(200).json({ message: 'Post deletado' });
    },
    async update(req, res) {
        const { id } = req.params;
        const { name, title, description } = req.body;
        const avatarName = req.file;
        const avatar = avatarName.filename;
        const personaRepository = typeorm_1.getRepository(Persona_1.default);
        const data = {
            name,
            title,
            description,
            avatar
        };
        const schema = Yup.object().shape({
            name: Yup.string().required(),
            title: Yup.string().required(),
            description: Yup.string().required(),
            avatar: Yup.string(),
        });
        await schema.validate(data, {
            abortEarly: false,
        });
        await personaRepository.update(id, data);
        return res.status(200).json(data);
    },
    async show(req, res) {
        const { id } = req.params;
        const personaRepository = typeorm_1.getRepository(Persona_1.default);
        const data = await personaRepository.findOneOrFail(id, {
            relations: ['personaImages']
        });
        return res.status(200).json(persona_view_1.default.render(data));
    },
    async index(req, res) {
        const personaRepository = typeorm_1.getRepository(Persona_1.default);
        const data = await personaRepository.find({
            relations: ['personaImages']
        });
        return res.status(200).json(persona_view_1.default.renderMany(data));
    },
    async create(req, res) {
        const { name, title, description } = req.body;
        const personaRepository = typeorm_1.getRepository(Persona_1.default);
        const requestImages = req.files;
        const images = requestImages.images.map((image) => {
            return {
                path: image.filename.replace(/\s+/g, '-')
            };
        });
        const avatar = requestImages.avatar.map((avatar) => {
            return {
                avatar: avatar.filename.replace(/\s+/g, '-')
            };
        });
        const data = {
            name,
            title,
            description,
            avatar: avatar[0].avatar,
            personaImages: images,
        };
        const schema = Yup.object().shape({
            name: Yup.string().required(),
            title: Yup.string().required(),
            description: Yup.string().required(),
            avatar: Yup.string().required(),
            personaImages: Yup.array(Yup.object().shape({
                path: Yup.string().required()
            }))
        });
        await schema.validate(data, {
            abortEarly: false,
        });
        const result = personaRepository.create(data);
        await personaRepository.save(result);
        return res.status(201).json(result);
    }
};
