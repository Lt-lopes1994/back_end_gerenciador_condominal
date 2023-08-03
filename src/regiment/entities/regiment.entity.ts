import { Document } from "mongoose";

export interface Regiment extends Document {
    fileName: string;
    size: number;
    contentType: string;
    url: string;
    readonly createdAt: Date;
}
