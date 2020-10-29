import { Request, Response } from 'express';
import { getRepository } from 'typeorm';

import LinkMovie from '../models/LinkMovie';
import * as Yup from 'yup';

import linkmovie from '../views/link_movie_view';

export default {

  async index(req: Request, res: Response) {

    const linkMovieRepository = getRepository(LinkMovie);

    const data = await linkMovieRepository.find();

    return res.status(200).json(linkmovie.renderMany(data));
  },

  async update(req: Request, res: Response) {

    const { id } = req.params;
    const {
      title,
      url,
    } = req.body;

    const linkMovieRepository = getRepository(LinkMovie);

    const data = { title, url }

    await linkMovieRepository.update( id, data );

    return res.status(200).json(data);
  },

  async delete(req: Request, res: Response) {

    const { id } = req.params;

    const linkMovieRepository = getRepository(LinkMovie);

    await linkMovieRepository.delete( id );

    return res.status(200).json({ message: 'sucesso' });
  },

  async create(req: Request, res: Response) {

    const { title, url } = req.body;

    const linkMovieRepository = getRepository(LinkMovie);

    const data = {
      title,
      url,
    }

    const schema = Yup.object().shape({
      title: Yup.string().required(),
      url: Yup.string().url(),
    })

    await schema.validate(data, {
      abortEarly: false,
    });

    const result = linkMovieRepository.create(data);

    await linkMovieRepository.save(result);

    return res.status(201).json(result);
  }
}
