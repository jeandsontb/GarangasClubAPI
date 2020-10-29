import { Request, Response } from 'express';
import { getRepository } from 'typeorm';
import * as Yup from 'yup';

import Historic from '../models/Historic';
import historicView from '../views/historic_view';

export default {

  async index(req: Request, res: Response) {

    const historicRepository = getRepository(Historic);

    const result = await historicRepository.find();

    return res.status(200).json(historicView.renderMany(result));
  },

  async update(req: Request, res: Response) {

    const {
      title,
      description,
      image,
    } = req.body;

    const historicRepository = getRepository(Historic);

    const { id } = req.params;
    const data = {
      title,
      description,
      image,
    }

    const schema = Yup.object().shape({
      title: Yup.string().required(),
      description: Yup.string().required(),
      image: Yup.string().required(),
    });

    await schema.validate(data, {
      abortEarly: false,
    });

    const result = historicRepository.create(data);

    await historicRepository.update(id, data);

    return res.status(200).json(result);
  },

  async create(req: Request, res: Response) {

    const {
      title,
      description,
      image
    } = req.body;

    const historicRepository = getRepository(Historic);

    const data = {
      title,
      description,
      image,
    }

    const schema = Yup.object().shape({
      title: Yup.string().required(),
      description: Yup.string().required(),
      image: Yup.string().required(),
    });

    await schema.validate(data, {
      abortEarly: false,
    });

    const result = historicRepository.create(data);

    await historicRepository.save(result);

    return res.status(201).json(result);
  }
}
