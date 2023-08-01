import * as mongoose from 'mongoose';

export const UserSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: { type: String, required: true },
    door: { type: Number, required: true },
    tower: { type: String, required: true },
    role: { type: String, required: true, default: 'user' },
    activebit: { type: Boolean, required: true, default: true },
    verificationCode: { type: Number },
    expirationTime: { type: Date },
    codeCondominium: { type: String, require: true }
  },
  { timestamps: true, collection: 'users' },
);
