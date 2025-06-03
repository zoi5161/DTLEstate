import mongoose, { Schema, Document } from 'mongoose';

export interface IEstate extends Document {
  name: string;
  images: string[];
  address: string;
  imageAddress: string;
  slogan?: string;
  price: number;
  area: number;
  startSell: Date;
  description: string;
  status?: string;
  buyerAgentFee?: number;
  lifestyles?: string;
  viewDescription?: string;
  utilities?: string;
}

const EstateSchema: Schema = new Schema({
  name: { type: String, required: true },
  images: { type: [String], default: [] },
  address: { type: String, required: true },
  imageAddress: { type: String, required: true },
  slogan: { type: String },
  price: { type: Number, required: true },
  area: { type: Number, required: true },
  startSell: { type: Date, required: true },
  description: { type: String, required: true },
  status: { type: String },
  buyerAgentFee: { type: Number },
  lifestyles: { type: String },
  viewDescription: { type: String },
  utilities: { type: String },
}, { timestamps: true });

export default mongoose.model<IEstate>('Estate', EstateSchema);