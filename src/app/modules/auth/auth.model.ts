import { Schema, model } from 'mongoose';
import { Tuser } from './auth.interface';

const UserSchema = new Schema<Tuser>({
  username: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true, select: 0 },
  role: { type: String },
  createdAt: { type: Date },
  updatedAt: { type: Date },
  token: { type: String },
  currentPassword: { type: String, select: 0 },
  newPassword: { type: String, select: 0 },
  passwordChangeHistory: { type: Object, select: 0 },
});

const AuthModel = model<Tuser>('User', UserSchema);
export default AuthModel;
