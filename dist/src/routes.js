"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const multer_1 = __importDefault(require("multer"));
const Upload_1 = __importDefault(require("./config/Upload"));
const EventsController_1 = __importDefault(require("./controller/EventsController"));
const ProjectsController_1 = __importDefault(require("./controller/ProjectsController"));
const LinkMovieController_1 = __importDefault(require("./controller/LinkMovieController"));
const HistoricController_1 = __importDefault(require("./controller/HistoricController"));
const PersonasController_1 = __importDefault(require("./controller/PersonasController"));
const CarSaleController_1 = __importDefault(require("./controller/CarSaleController"));
const UserController_1 = __importDefault(require("./controller/UserController"));
const routes = express_1.Router();
const upload = multer_1.default(Upload_1.default);
//################# Home ################################################
routes.post('/movies', LinkMovieController_1.default.create);
routes.get('/movies', LinkMovieController_1.default.index);
routes.put('/movies/:id', LinkMovieController_1.default.update);
routes.delete('/movies/:id', LinkMovieController_1.default.delete);
routes.post('/events', upload.single('images'), EventsController_1.default.create);
routes.get('/events', EventsController_1.default.index);
routes.get('/events/:id', EventsController_1.default.show);
routes.delete('/events/:id', EventsController_1.default.delete);
routes.post('/projects', upload.array('images'), ProjectsController_1.default.create);
routes.get('/projects', ProjectsController_1.default.index);
routes.get('/projects/:id', ProjectsController_1.default.show);
routes.put('/projects/:id', upload.array('images'), ProjectsController_1.default.update);
routes.delete('/projects/:id', ProjectsController_1.default.delete);
//################# Historic #############################################
routes.post('/historic', HistoricController_1.default.create);
routes.put('/historic/:id', HistoricController_1.default.update);
routes.put('/historic', HistoricController_1.default.index);
//################# Personas ################################################
routes.post('/personas', upload.fields([
    { name: 'avatar', maxCount: 1 },
    { name: 'images', maxCount: 20 }
]), PersonasController_1.default.create);
routes.get('/personas', PersonasController_1.default.index);
routes.get('/personas/:id', PersonasController_1.default.show);
routes.delete('/personas/:id', PersonasController_1.default.delete);
routes.put('/personas/:id', upload.single('avatar'), PersonasController_1.default.update);
//################# Cars the Sale ############################################
routes.post('/carsales', upload.fields([
    { name: 'cover', maxCount: 1 },
    { name: 'images', maxCount: 20 }
]), CarSaleController_1.default.create);
routes.put('/carsales/:id', upload.single('cover'), CarSaleController_1.default.update);
routes.get('/carsales', CarSaleController_1.default.index);
routes.get('/carsales/:id', CarSaleController_1.default.show);
routes.delete('/carsales/:id', CarSaleController_1.default.delete);
//################# User #####################################################
routes.post('/users', UserController_1.default.create);
routes.get('/users', UserController_1.default.index);
routes.delete('/users/:id', UserController_1.default.delete);
exports.default = routes;
