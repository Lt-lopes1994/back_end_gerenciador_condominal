import * as mongoose from 'mongoose';

export const SupportSchema = new mongoose.Schema(
    {
        name: { type: String, required: true },
        email: { type: String, required: true },
        phone: { type: String, required: true },
        tower: { type: String, required: true },
        door: { type: Number, required: true },
        title: { type: String, required: true },
        text_area: { type: String, required: true },
        solved: { type: Boolean, default: false },
    },
    { timestamps: true, collection: 'support' },
);