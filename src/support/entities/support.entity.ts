import { Document } from 'mongoose';

export class Support extends Document {
    readonly name: string;
    readonly email: string;
    readonly phone: string;
    readonly tower: string;
    readonly door: string;
    readonly title: string;
    readonly text_area: string;
    readonly solved: boolean;
    readonly ticket_number: number;
}