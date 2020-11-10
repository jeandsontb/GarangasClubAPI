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
const User_1 = __importDefault(require("../models/User"));
exports.default = {
    async create(req, res) {
        const { name, username } = req.body;
        const userRepository = typeorm_1.getRepository(User_1.default);
        const data = {
            name,
            username,
        };
        const schema = Yup.object().shape({
            name: Yup.string().required(),
            username: Yup.string().required(),
        });
        await schema.validate(data, {
            abortEarly: false,
        });
        const result = userRepository.create(data);
        await userRepository.save(result);
        return res.status(201).json(result);
    },
    async index(req, res) {
        const userRepository = typeorm_1.getRepository(User_1.default);
        const result = await userRepository.find();
        return res.status(200).json(result);
    },
    async delete(req, res) {
        const { id } = req.params;
        const userRepository = typeorm_1.getRepository(User_1.default);
        await userRepository.delete(id);
        return res.status(200).json({ message: 'Sucesso ao deletar' });
    }
};
