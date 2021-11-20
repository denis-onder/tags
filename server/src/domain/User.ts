import { model, Schema } from 'mongoose';

export interface User {
  _id: Schema.Types.ObjectId;
  email: string;
  displayName: string;
  password: string;
}

export const UserSchema = new Schema<User>({
  displayName: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
});

export const UserModel = model<User>('User', UserSchema);
