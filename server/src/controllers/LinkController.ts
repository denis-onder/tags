import { Response, Router } from 'express';
import { ObjectId } from 'mongoose';
import { AuthorizedRequest } from '../domain/AuthorizedRequest';
import { Link } from '../domain/Link';
import LinkService from '../services/LinkService';
import BaseController from './BaseController';

export default class LinkController implements BaseController<Link> {
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
      const payload: Link = req.body;
      payload.user = req.user?._id as ObjectId;

      const result = await new LinkService().create(payload);

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
      const query = { user: req.user?._id };

      const result = await new LinkService().find(query);

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
      const result = await new LinkService().findById(id);

      if (result?.user !== req.user?._id) {
        res.status(404);
      }

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
      const payload: Partial<Link> = req.body;

      const result = await new LinkService().update(id, payload);

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
      const result = await new LinkService().delete(id);

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
