import { Document } from 'mongoose';

export interface CommomArea extends Document {
  name: string;
  condominiumId: string;
  description: string;
  urlImage: string;
  activebit: boolean;
}
