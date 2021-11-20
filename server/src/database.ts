import mongoose from 'mongoose';
import config from './config';

export async function connect() {
  try {
    await mongoose.connect(config.mongoUri);
  } catch (error) {
    console.error(error);
  }
}
