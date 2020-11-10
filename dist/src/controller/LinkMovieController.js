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
const LinkMovie_1 = __importDefault(require("../models/LinkMovie"));
const Yup = __importStar(require("yup"));
const link_movie_view_1 = __importDefault(require("../views/link_movie_view"));
exports.default = {
    async index(req, res) {
        const linkMovieRepository = typeorm_1.getRepository(LinkMovie_1.default);
        const data = await linkMovieRepository.find();
        return res.status(200).json(link_movie_view_1.default.renderMany(data));
    },
    async update(req, res) {
        const { id } = req.params;
        const { title, url, } = req.body;
        const linkMovieRepository = typeorm_1.getRepository(LinkMovie_1.default);
        const data = { title, url };
        await linkMovieRepository.update(id, data);
        return res.status(200).json(data);
    },
    async delete(req, res) {
        const { id } = req.params;
        const linkMovieRepository = typeorm_1.getRepository(LinkMovie_1.default);
        await linkMovieRepository.delete(id);
        return res.status(200).json({ message: 'sucesso' });
    },
    async create(req, res) {
        const { title, url } = req.body;
        const linkMovieRepository = typeorm_1.getRepository(LinkMovie_1.default);
        const data = {
            title,
            url,
        };
        const schema = Yup.object().shape({
            title: Yup.string().required(),
            url: Yup.string().url(),
        });
        await schema.validate(data, {
            abortEarly: false,
        });
        const result = linkMovieRepository.create(data);
        await linkMovieRepository.save(result);
        return res.status(201).json(result);
    }
};
