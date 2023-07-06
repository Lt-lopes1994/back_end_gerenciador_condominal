import { Document } from "mongoose";

export interface Administrator extends Document {
    readonly _id?: number;
    cnpj: string;
    contactPerson: string;
    email: string;
    ie: string;
    phone: string;
    whattsApp: string;
    activebit: boolean;
    readonly createdAt: Date;
    readonly updatedAt: Date;
}
