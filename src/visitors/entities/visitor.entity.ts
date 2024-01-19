import { Document } from 'mongoose';
import { VisitorPictureDto } from '../dto/visitor-picture.dto';

export class Visitor extends Document {
    cpf: string;
    name: string;
    visit_reason: string;
    resident_name: string;
    door_visited: number;
    tower_visited: string;
    visitor_photo: VisitorPictureDto;
    departure_date?: Date;
    readonly createdAt: Date;
    readonly updatedAt: Date;
    readonly expireAt: Date;
}