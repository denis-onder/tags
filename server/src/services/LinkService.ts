import { Link, LinkModel } from '../domain/Link';
import BaseService from './BaseService';

export default class LinkService implements BaseService<Link> {
  async create(payload: Link): Promise<Link | null> {
    const linkExists = await LinkModel.findOne({
      Link: payload.user,
      url: payload.url,
    });

    if (linkExists) {
      throw new Error('Link already exists.');
    }

    const link = await new LinkModel(payload).save();

    return link;
  }
  async find(query: object): Promise<Link[] | null> {
    if (Object.keys(query).length === 0) {
      return Promise.resolve(null);
    }

    const payload = await LinkModel.find(query).populate('tags');

    return payload ? payload : null;
  }
  async findById(id: string): Promise<Link | null> {
    if (!id) {
      return Promise.resolve(null);
    }

    const link = await LinkModel.findById(id).populate('tags');

    return link || null;
  }
  update(id: string, payload: Partial<Link>): Promise<Link | null> {
    throw new Error('Method not implemented.');
  }
  async delete(id: string): Promise<boolean> {
    await LinkModel.findByIdAndDelete(id);

    return true;
  }
}
