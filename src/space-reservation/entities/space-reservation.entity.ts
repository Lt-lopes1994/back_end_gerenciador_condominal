import { Document} from 'mongoose'

export interface SpaceReservation extends Document{
    commonAreaId: string;
    date: Date;
    email: string;
    message?: string;
    name: string;
    people: number;
    phone: string;
    time: string;
    activebit: boolean;
}