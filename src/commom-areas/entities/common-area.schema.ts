import * as mongoose from 'mongoose';

export const CommomAreaSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    condominiumId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Condominium',
      required: true,
    },
    description: { type: String, required: true },
    activebit: { type: Boolean, required: true, default: true },
  },
  { timestamps: true, collection: 'commom-areas' },
);
