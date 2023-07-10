import * as mongoose from 'mongoose';

export const AdministratorSchema = new mongoose.Schema(
    {
        cnpj: {
            type: Number,
            require: true,
            unique: true
        },
        contactPerson: { type: String, require: true },
        email: {
            type: String,
            required: true,
            unique: true
        },
        ie: {
            type: Number,
            required: true,
            unique: true
        },
        phone: { type: Number, require: true },
        whatsApp: { type: Number, require: false },
        website: { type: String, require: false },
        activebit: {
            type: Boolean,
            required: true,
            default: true
        }
    },
    { timestamps: true, collection: 'administrators' }
);