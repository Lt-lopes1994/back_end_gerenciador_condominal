import { Document } from "mongoose";

export interface Administrator extends Document {
    readonly _id?: number;
    cnpj: number;
    contactPerson: string;
    email: string;
    ie: number;
    phone: number;
    whatsApp?: number;
    website?: string;
    activebit: boolean;
    readonly createdAt: Date;
    readonly updatedAt: Date;
}
