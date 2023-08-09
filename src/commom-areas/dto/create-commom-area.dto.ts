import { ObjectId } from 'mongoose';

export class CreateCommomAreaDto {
  name: string;
  condominiumId: ObjectId;
  description: string;
  urlImage: string;
  activebit: boolean;
}
