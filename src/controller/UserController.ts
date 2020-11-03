import { Request, Response } from 'express';
import { getRepository } from 'typeorm';
import * as Yup from 'yup';

import User from '../models/User';

export default {

  async create(req: Request, res: Response) {

    const { name, username } = req.body;

    const userRepository = getRepository(User);

    const data = {
      name,
      username,
    }

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

  async index(req: Request, res: Response) {

    const userRepository = getRepository(User);

    const result = await userRepository.find();

    return res.status(200).json(result);
  },

  async delete(req: Request, res: Response) {

    const { id } = req.params;

    const userRepository = getRepository(User);

    await userRepository.delete(id);

    return res.status(200).json({ message: 'Sucesso ao deletar' });
  }
}
