import { Document } from "mongoose";

export interface Administrator extends Document {
    readonly _id?: number;
    cnpj: number;
    contactPerson: string;
    email: string;
    ie: number;
    phone: number;
    whattsApp: number;
    activebit: boolean;
    readonly createdAt: Date;
    readonly updatedAt: Date;
}
