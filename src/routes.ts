import { Router } from 'express';
import multer from 'multer';

import UploadConfig from './config/Upload';
import EventsController from './controller/EventsController';
import ProjectsController from './controller/ProjectsController';
import LinkMovieController from './controller/LinkMovieController';
import HistoricController from './controller/HistoricController';
import PersonasController from './controller/PersonasController';


const routes = Router();
const upload = multer(UploadConfig);


//################# Home ################################################
routes.post('/movies', LinkMovieController.create);
routes.get('/movies', LinkMovieController.index);
routes.put('/movies/:id', LinkMovieController.update);
routes.delete('/movies/:id', LinkMovieController.delete);

routes.post('/events', upload.single('images'), EventsController.create);
routes.get('/events', EventsController.index);
routes.get('/events/:id', EventsController.show);
routes.delete('/events/:id', EventsController.delete);

routes.post('/projects', upload.array('images') ,ProjectsController.create);
routes.get('/projects', ProjectsController.index);
routes.get('/projects/:id', ProjectsController.show);
routes.put('/projects/:id', upload.array('images'), ProjectsController.update);
routes.delete('/projects/:id', ProjectsController.delete);

//################# Historic #############################################
routes.post('/historic', HistoricController.create);
routes.put('/historic/:id', HistoricController.update);
routes.put('/historic', HistoricController.index);

//################# Personas ################################################
routes.post('/personas', upload.array('images'), PersonasController.create);



export default routes;
