import { Request, Response } from 'express';
import { getRepository } from 'typeorm';
import * as Yup from 'yup';

import CarSale from '../models/CarSale';

import carSaleShow from '../views/carsale_view';

export default {

  async delete(req: Request, res: Response) {

    const { id } = req.params;

    const carSaleRepository = getRepository(CarSale);

    await carSaleRepository.delete(id);

    return res.status(200).json({ message: 'Sucesso ao deletar' });
  },

  async show(req: Request, res: Response) {

    const { id } = req.params;

    const carSaleRepository = getRepository(CarSale);

    const result = await carSaleRepository.findOneOrFail(id, {
      relations: ['carSaleImages']
    });

    return res.status(200).json(carSaleShow.render(result));
  },

  async index(req: Request, res: Response) {

    const carSaleRepository = getRepository(CarSale);

    const result = await carSaleRepository.find({
      relations: ['carSaleImages']
    });

    return res.status(200).json(carSaleShow.renderMany(result));
  },

  async update(req: Request, res: Response) {

    const { id } = req.params;
    const {
      name,
      title,
      description,
      phone,
      price
    } = req.body;

    const coverName = req.file as Express.Multer.File;
    const cover = coverName.filename;

    const carSaleRepository = getRepository(CarSale);

    const data = {
      name,
      title,
      description,
      phone,
      price,
      cover,
    };

    const schema = Yup.object().shape({
      name: Yup.string().required(),
      title: Yup.string().required(),
      description: Yup.string().required(),
      phone: Yup.string().required(),
      price: Yup.string().required(),
    });

    await schema.validate(data, {
      abortEarly: false,
    });

    await carSaleRepository.update(id, data);

    return res.status(200).json(data);
  },

  async create(req: Request, res: Response) {

    const {
      name,
      title,
      description,
      phone,
      price
    } = req.body;

    const carSaleRepository = getRepository(CarSale);

    const requestImages = req.files as Express.Multer.File[];
    const cover = requestImages.cover.map((cover) => {
      return {
        cover: cover.filename.replace(/\s+/g, '-')
      }
    });

    const images = requestImages.images.map((image) => {
      return {
        path: image.filename.replace(/\s+/g, '-')
      }
    });

    const data = {
      name,
      title,
      description,
      phone,
      price,
      cover: cover[0].cover,
      carSaleImages: images,
    }

    const schema = Yup.object().shape({
      name: Yup.string().required(),
      title: Yup.string().required(),
      description: Yup.string().required(),
      phone: Yup.string().required(),
      price: Yup.string().required(),
      cover: Yup.string().required(),
      carSaleImages: Yup.array(
        Yup.object().shape({
          path: Yup.string().required()
        })
      )
    });

    await schema.validate(data, {
      abortEarly: false,
    });

    const result = carSaleRepository.create(data);

    await carSaleRepository.save(result);

    console.log(result);

    return res.status(201).json(result);
  }
}
