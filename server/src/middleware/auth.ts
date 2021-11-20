import { NextFunction, Response } from 'express';
import { AuthorizedRequest } from '../domain/AuthorizedRequest';
import { decodeToken } from '../utils/jwt';
import UserService from '../services/UserService';
import { User, UserModel } from '../domain/User';

export default async function (
  req: AuthorizedRequest,
  res: Response,
  next: NextFunction
): Promise<void> {
  const token = req.headers.authorization;
  let user: User | null = null;

  if (token) {
    user = decodeToken(token);
  }

  if (user) {
    req.user = user;
    next();
  } else {
    res.status(401).send('Unauthorized');
  }
}
