import { Document } from 'mongoose';

export class Visitor extends Document {
    cpf: string;
    name: string;
    departure_date: Date;
    visit_reason: string;
    resident_name: string;
    door_visited: number;
    tower_visited: string;
    activebit: boolean;
    visitor_photo: string;
    readonly createdAt: Date;
    readonly updatedAt: Date;
    readonly expireAt: Date;
}