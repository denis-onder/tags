import argon2 from 'argon2';
import userValidator from '../validators/userValidator';
import { User, UserModel } from '../domain/User';
import BaseService from './BaseService';

export default class UserService implements BaseService<User> {
  async create(payload: User): Promise<User> {
    const validatorResponse = userValidator(payload);

    if (!validatorResponse.valid) {
      const message = validatorResponse.errors?.join('\n');
      throw new Error(`Invalid Input:\n${message}`);
    }

    const alreadyExists = await UserModel.findOne({ email: payload.email });

    if (alreadyExists) {
      throw new Error('This user already exists.');
    }

    payload.password = await argon2.hash(payload.password);

    const user = new UserModel(payload);
    return await user.save();
  }
  async find(query: object): Promise<User | null> {
    if (Object.keys(query).length === 0) {
      return Promise.resolve(null);
    }

    const payload = await UserModel.findOne(query);

    return payload ? payload : null;
  }
  async findById(id: string): Promise<User | null> {
    if (!id) {
      return Promise.resolve(null);
    }

    const user = await UserModel.findById(id);

    return user || null;
  }
  update(id: string, payload: Partial<User>): Promise<User | null> {
    throw new Error('Method not implemented.');
  }
  async delete(id: string): Promise<boolean> {
    await UserModel.findByIdAndDelete(id);

    return true;
  }
}
