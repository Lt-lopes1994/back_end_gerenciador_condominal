import * as mongoose from 'mongoose';

export const SpaceReservationSchema = new mongoose.Schema(
    {
        date:{ 
            type: Date, 
            require: true, 
        },
        email: { 
            type: String, 
            required: true,  
        },
        message: { 
            type: String, 
            required: false,  
        },
        name: { 
            type: String, 
            required: true,  
        },
        people: { 
            type: Number, 
            required: true,  
        },
        phone: { 
            type: String, 
            required: true,  
        },
        time: { 
            type: String, 
            required: true,  
        },
        activebit: {
            type: Boolean,
            required: true,
            default: true
        }
    },
    { timestamps: true, collection: 'spaceReservation' }
);