import jwt from 'jsonwebtoken';
import { User } from '../domain/User';
import config from '../config';

export function generateToken(user: User): string {
  return jwt.sign({ ...user }, config.secret, {
    expiresIn: '1h',
  });
}

export function decodeToken(token: string): User | null {
  token = token.replace('Bearer ', '');
  const decoded = jwt.verify(token, config.secret);

  if (decoded) {
    return (decoded as jwt.JwtPayload)._doc as User;
  } else {
    return null;
  }
}
