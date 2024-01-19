import * as mongoose from 'mongoose';

export const VisitorSchema = new mongoose.Schema(
    {
        cpf: {
            type: String,
            required: true,
            unique: true
        },
        name: { type: String, required: true },
        visit_reason: { type: String, required: true },
        resident_name: { type: String, required: true },
        door_visited: { type: Number, required: true },
        tower_visited: { type: String, required: true },
        visitor_photo: { type: Object, required: true },
        departure_date: { type: Date, required: false },
        vehicle_plate: { type: String, required: false },
        expireAt: { type: Date, expires: 0 }
    },
    { timestamps: true, collection: 'visitors' },
);