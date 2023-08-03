import * as mongoose from 'mongoose';

export const RegimentSchema = new mongoose.Schema(
    {
        fileName: { type: String, required: true },
        size: { type: Number, required: true },
        contentType: { type: String, required: true },
        url: { type: String, required: true },
    },
    { timestamps: true, collection: 'regiments' }
);