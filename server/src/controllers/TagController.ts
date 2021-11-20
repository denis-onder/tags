import { Response, Router } from 'express';
import { AuthorizedRequest } from '../domain/AuthorizedRequest';
import { Tag } from '../domain/Tag';
import TagService from '../services/TagService';
import BaseController from './BaseController';

export default class TagController implements BaseController<Tag> {
  router: Router;

  constructor() {
    this.router = Router();

    this.router.get('/', this.find);
    this.router.get('/:id', this.findById);
    this.router.post('/', this.create);
    this.router.put('/:id', this.update);
    this.router.delete('/:id', this.delete);
  }

  async create(req: AuthorizedRequest, res: Response): Promise<void> {
    try {
      const payload: Tag = req.body;
      const result = await new TagService().create(payload);

      res.status(200).json(result);
    } catch (error: any) {
      if (error.code && error.message) {
        res.status(error.code).send(error.message);
      } else {
        res.status(500).send('A server error has occured');
      }
    }
  }
  async find(req: AuthorizedRequest, res: Response): Promise<void> {
    try {
      const link = req.query.linkId;

      if (!link) {
        res.status(400).send('No link ID provided');
      }

      const query = {
        link,
      };

      const result = await new TagService().find(query);

      res.status(200).json(result);
    } catch (error: any) {
      if (error.code && error.message) {
        res.status(error.code).send(error.message);
      } else {
        res.status(500).send('A server error has occured');
      }
    }
  }
  async findById(req: AuthorizedRequest, res: Response): Promise<void> {
    try {
      const { id } = req.params;
      const result = await new TagService().findById(id);

      res.status(200).json(result);
    } catch (error: any) {
      if (error.code && error.message) {
        res.status(error.code).send(error.message);
      } else {
        res.status(500).send('A server error has occured');
      }
    }
  }
  async update(req: AuthorizedRequest, res: Response): Promise<void> {
    try {
      const { id } = req.params;
      const payload: Partial<Tag> = req.body;

      const result = await new TagService().update(id, payload);

      res.status(200).json(result);
    } catch (error: any) {
      if (error.code && error.message) {
        res.status(error.code).send(error.message);
      } else {
        res.status(500).send('A server error has occured');
      }
    }
  }
  async delete(req: AuthorizedRequest, res: Response): Promise<void> {
    try {
      const { id } = req.params;
      const result = await new TagService().delete(id);

      res.status(200).json(result);
    } catch (error: any) {
      if (error.code && error.message) {
        res.status(error.code).send(error.message);
      } else {
        res.status(500).send('A server error has occured');
      }
    }
  }
}
