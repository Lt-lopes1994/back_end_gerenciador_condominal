import * as mongoose from 'mongoose';

export const AdministratorSchema = new mongoose.Schema(
    {
        cnpj: {
            type: String,
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
            type: String,
            required: true,
            unique: true
        },
        phone: { type: String, require: true },
        whattsApp: { type: String, require: false },
        activebit: {
            type: Boolean,
            required: true,
            default: true
        }
    },
    { timestamps: true, collection: 'administrator' }
);