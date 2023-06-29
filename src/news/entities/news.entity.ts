import { Document } from 'mongoose';

export interface News extends Document {
  title: string;
  content: string;
  ULRimage: string;
  alt: string;
  readonly createdAt: Date;
  readonly updatedAt: Date;
  UserId: string;
}
