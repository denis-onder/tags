import { Request, Response, Router } from 'express';
import BaseService from 'src/services/BaseService';

export default interface BaseController<T> {
  router: Router;

  create(req: Request, res: Response): void;
  find(req: Request, res: Response): void;
  findById(req: Request, res: Response): void;
  update(req: Request, res: Response): void;
  delete(req: Request, res: Response): void;
}
