import { Request, Response } from 'express';
import { getRepository } from 'typeorm';
import * as Yup from 'yup';

import Persona from '../models/Persona';

import personaView from '../views/persona_view';

export default {

  async delete(req: Request, res: Response) {

    const { id } = req.params;

    const personaRepository = getRepository(Persona);

    await personaRepository.delete(id);

    return res.status(200).json({ message: 'Post deletado' });
  },

  async update(req: Request, res: Response) {

    const { id } = req.params;
    const { name, title, description } = req.body;

    const avatarName = req.file as Express.Multer.File;
    const avatar = avatarName.filename;

    const personaRepository = getRepository(Persona);

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

  async show(req: Request, res: Response) {

    const { id } = req.params;

    const personaRepository = getRepository(Persona);

    const data = await personaRepository.findOneOrFail(id, {
      relations: ['personaImages']
    });

    return res.status(200).json(personaView.render(data));
  },

  async index(req: Request, res: Response) {

    const personaRepository = getRepository(Persona);

    const data = await personaRepository.find({
      relations: ['personaImages']
    });

    return res.status(200).json(personaView.renderMany(data));
  },

  async create(req: Request, res: Response) {

    const {
        name,
        title,
        description
     } = req.body;

    const personaRepository = getRepository(Persona);

    const requestImages = req.files as Express.Multer.File[];
    const images = requestImages.images.map((image) => {
      return {
        path: image.filename.replace(/\s+/g, '-')
      }
    });

    const avatar = requestImages.avatar.map((avatar) => {
      return {
        avatar: avatar.filename.replace(/\s+/g, '-')
      }
    });

     const data = {
       name,
       title,
       description,
       avatar: avatar[0].avatar,
       personaImages: images,
     }

     const schema = Yup.object().shape({
        name: Yup.string().required(),
        title: Yup.string().required(),
        description: Yup.string().required(),
        avatar: Yup.string().required(),
        personaImages: Yup.array(
          Yup.object().shape({
            path: Yup.string().required()
          })
        )
     });

     await schema.validate(data, {
       abortEarly: false,
     });

    const result = personaRepository.create(data);

    await personaRepository.save(result);

    return res.status(201).json(result);
  }
}
