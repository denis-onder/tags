import { model, Schema } from 'mongoose';
import { Tag } from './Tag';

export interface Link {
  _id: Schema.Types.ObjectId;
  user: Schema.Types.ObjectId;
  url: string;
  tags: Array<Tag>;
}

export const LinkSchema = new Schema<Link>({
  url: {
    type: String,
    required: true,
  },
  user: {
    type: Schema.Types.ObjectId,
    required: true,
  },
  tags: [
    {
      type: Schema.Types.ObjectId,
      default: [],
      ref: 'Tag',
    },
  ],
});

export const LinkModel = model<Link>('Link', LinkSchema);
