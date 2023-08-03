import * as mongoose from 'mongoose';

export const RegimentSchema = new mongoose.Schema(
    {
        filename: { type: String, required: true }
    },
    { timestamps: true, collection: 'regiments' }
);