import { Request, Response } from 'express';
import { getRepository } from 'typeorm';
import * as Yup from 'yup';

import Event from '../models/Event';
import eventView from '../views/events_view';

export default {

  async index(req: Request, res: Response) {

    const eventRepository = getRepository(Event);

    const data = await eventRepository.find();

    return res.status(201).json(eventView.renderMany(data));
  },

  async show(req: Request, res: Response) {

    const { id } = req.params;

    const eventRepository = getRepository(Event);

    const data = await eventRepository.findOneOrFail( id );

    return res.status(201).json(eventView.render(data));
  },

  async delete(req: Request, res: Response) {

    const { id } = req.params;

    const eventRepository = getRepository(Event);

    await eventRepository.delete( id );

    return res.status(201).json({ message: 'Sucesso' });
  },

  async create(req: Request, res: Response) {

    const {
      title,
      description,
      date,
    } = req.body;

    const eventRepository = getRepository(Event);

    const requestImage = req.file as Express.Multer.File;
    const img = requestImage.filename;

    const data = {
      img,
      title,
      description,
      date,
    }

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
}
