import * as mongoose from 'mongoose';

export const NewsSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    content: { type: String, required: true },
    ULRimage: { type: String, required: true },
    alt: { type: String, required: true },
    UserId: { type: String, required: true },
  },
  { timestamps: true },
);
