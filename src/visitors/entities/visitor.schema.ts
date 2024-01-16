import * as mongoose from 'mongoose';

export const VisitorSchema = new mongoose.Schema(
    {
        cpf: {
            type: String,
            required: true,
            unique: true
        },
        name: { type: String, required: true },
        departure_date: { type: Date, required: true },
        visit_reason: { type: String, required: true },
        resident_name: { type: String, required: true },
        door_visited: { type: Number, required: true },
        tower_visited: { type: String, required: true },
        visitor_photo: { type: String, required: true },
        activebit: { type: Boolean, required: true, default: true },
        expireAt: { type: Date, expires: 0 }
    },
    { timestamps: true, collection: 'visitors' },
);