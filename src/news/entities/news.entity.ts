import { Document } from 'mongoose';
import * as mongoose from 'mongoose';

export interface News extends Document {
  title: string;
  content: string;
  ULRimage: string;
  alt: string;
  readonly createdAt: Date;
  readonly updatedAt: Date;
  userId: {
    type: mongoose.Schema.Types.ObjectId;
    ref: 'User';
  };
}
