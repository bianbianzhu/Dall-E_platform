import { model, Schema } from 'mongoose';

export default model(
  'Post',
  new Schema({
    name: {
      type: String,
      required: true,
    },
    prompt: {
      type: String,
      required: true,
    },
    imageUrl: {
      type: String,
      required: true,
    },
  })
);
