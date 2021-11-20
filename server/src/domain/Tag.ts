import { model, Schema } from 'mongoose';

export interface Tag {
  _id: Schema.Types.ObjectId;
  link: Schema.Types.ObjectId;
  value: string;
}

export const TagSchema = new Schema<Tag>({
  link: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: 'Link',
  },
  value: {
    type: String,
    required: true,
  },
});

export const TagModel = model<Tag>('Tag', TagSchema);
