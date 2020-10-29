import { Request, Response } from 'express';
import { getRepository } from 'typeorm';
import * as Yup from 'yup';

import Persona from '../models/Persona';

export default {

  async create(req: Request, res: Response) {

    const {
        name,
        title,
        description
     } = req.body;

     const personaRepository = getRepository(Persona);

     const requestImages = req.files as Express.Multer.File[];
     const personaImages = requestImages.map((image) => {
       return {
         path: image.filename.replace(/\s+/g, '-')
       }
     })

     const data = {
       name,
       title,
       description,
       personaImages
     }

     const schema = Yup.object().shape({
        name: Yup.string().required(),
        title: Yup.string().required(),
        description: Yup.string().required(),
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
