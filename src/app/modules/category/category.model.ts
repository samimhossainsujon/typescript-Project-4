import { Schema, model } from 'mongoose';
import { Tcatagory } from './category.interface';

const CatagorySchema = new Schema<Tcatagory>({
  name: { type: String, required: true, unique: true },
  createdBy: { type: Schema.Types.ObjectId, ref: 'User' },
  createdAt: { type: Date },
  updatedAt: { type: Date },
});

const CatagoryModel = model<Tcatagory>('Catagory', CatagorySchema);
export default CatagoryModel;
