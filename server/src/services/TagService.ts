import { Tag, TagModel } from '../domain/Tag';
import BaseService from './BaseService';

export default class TagService implements BaseService<Tag> {
  async create(payload: Tag): Promise<Tag | null> {
    const tagExists = await TagModel.findOne({
      value: payload.value,
      link: payload.link,
    });

    if (tagExists) {
      throw new Error('Tag already exists.');
    }

    const Tag = await new TagModel(payload).save();

    return Tag;
  }
  async find(query: object): Promise<Tag[] | null> {
    if (Object.keys(query).length === 0) {
      return Promise.resolve(null);
    }

    const payload = await TagModel.find(query);

    return payload ? payload : null;
  }
  async findById(id: string): Promise<Tag | null> {
    if (!id) {
      return Promise.resolve(null);
    }

    const tag = await TagModel.findById(id);

    return tag || null;
  }
  update(id: string, payload: Partial<Tag>): Promise<Tag | null> {
    throw new Error('Method not implemented.');
  }
  async delete(id: string): Promise<boolean> {
    await TagModel.findByIdAndDelete(id);

    return true;
  }
}
