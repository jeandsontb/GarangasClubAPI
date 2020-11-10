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
const Project_1 = __importDefault(require("../models/Project"));
const Yup = __importStar(require("yup"));
const projects_view_1 = __importDefault(require("../views/projects_view"));
exports.default = {
    async index(req, res) {
        const projetcRepository = typeorm_1.getRepository(Project_1.default);
        const data = await projetcRepository.find({
            relations: ['images']
        });
        return res.json(projects_view_1.default.renderMany(data));
    },
    async show(req, res) {
        const { id } = req.params;
        const projetcRepository = typeorm_1.getRepository(Project_1.default);
        const data = await projetcRepository.findOneOrFail(id, {
            relations: ['images']
        });
        return res.json(projects_view_1.default.render(data));
    },
    async create(req, res) {
        const { name, title, description, future_projects } = req.body;
        const projetcRepository = typeorm_1.getRepository(Project_1.default);
        const requestImages = req.files;
        const images = requestImages.map((image) => {
            return {
                path: image.filename.replace(/\s+/g, '-')
            };
        });
        const exception = {
            name,
            title,
            description,
            future_projects,
            images,
        };
        const schema = Yup.object().shape({
            name: Yup.string().required(),
            title: Yup.string().required(),
            description: Yup.string().required(),
            future_projects: Yup.string().required(),
            images: Yup.array(Yup.object().shape({
                path: Yup.string().required()
            }))
        });
        await schema.validate(exception, {
            abortEarly: false,
        });
        const data = projetcRepository.create(exception);
        await projetcRepository.save(data);
        return res.status(201).json(data);
    },
    async update(req, res) {
        const { id } = req.params;
        const { name, title, description, future_projects } = req.body;
        const projetcRepository = typeorm_1.getRepository(Project_1.default);
        const exception = {
            name,
            title,
            description,
            future_projects,
        };
        const schema = Yup.object().shape({
            name: Yup.string(),
            title: Yup.string(),
            description: Yup.string(),
            future_projects: Yup.string(),
            images: Yup.array(Yup.object().shape({
                path: Yup.string()
            }))
        });
        await schema.validate(exception, {
            abortEarly: false,
        });
        await projetcRepository.update(id, exception);
        return res.status(201).json(exception);
    },
    async delete(req, res) {
        const { id } = req.params;
        const projetcRepository = typeorm_1.getRepository(Project_1.default);
        await projetcRepository.delete({ id: Number(id) });
        return res.status(201).json({ message: 'post deletado com sucesso' });
    }
};
