import { Request, Response } from 'express';
import { getRepository } from 'typeorm';
import Project from '../models/Project';
import * as Yup from 'yup';

import projectView from '../views/projects_view';

export default {

  async index(req: Request, res: Response) {

    const projetcRepository = getRepository(Project);

    const data = await projetcRepository.find({
      relations: ['images']
    });

    return res.json(projectView.renderMany(data));
  },


  async show(req: Request, res: Response) {

    const { id } = req.params;

    const projetcRepository = getRepository(Project);

    const data = await projetcRepository.findOneOrFail(id, {
      relations: ['images']
    });

    return res.json(projectView.render(data));
  },

  async create(req: Request, res: Response) {
    const {
      name,
      title,
      description,
      future_projects } = req.body;

    const projetcRepository = getRepository(Project);

    const requestImages = req.files as Express.Multer.File[];
    const images = requestImages.map((image) => {
      return {
        path: image.filename.replace(/\s+/g, '-')
      }
    })

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
      images: Yup.array(
        Yup.object().shape({
          path: Yup.string().required()
        }
      ))
    });

    await schema.validate(exception, {
      abortEarly: false,
    });

    const data = projetcRepository.create(exception);

    await projetcRepository.save(data);

    return res.status(201).json(data);
  },

  async update(req: Request, res: Response) {

    const { id } = req.params;
    const {
      name,
      title,
      description,
      future_projects } = req.body;

    const projetcRepository = getRepository(Project);

    const exception = {
        name,
        title,
        description,
        future_projects,
        // images,
    };

    const schema = Yup.object().shape({
      name: Yup.string(),
      title: Yup.string(),
      description: Yup.string(),
      future_projects: Yup.string(),
      images: Yup.array(
        Yup.object().shape({
          path: Yup.string()
        }
      ))
    });

    await schema.validate(exception, {
      abortEarly: false,
    });

    await projetcRepository.update(id, exception);

    return res.status(201).json(exception);
  },

  async delete(req: Request, res: Response) {

    const { id } = req.params;

    const projetcRepository = getRepository(Project);

    await projetcRepository.delete({ id: Number(id) });

    return res.status(201).json({ message: 'post deletado com sucesso' });
  }


}
