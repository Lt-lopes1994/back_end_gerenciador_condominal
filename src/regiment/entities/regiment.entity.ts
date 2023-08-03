import { Document } from "mongoose";

export interface Regiment extends Document {
    url: string;
    readonly createdAt: Date;
}
