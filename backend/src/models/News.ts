import mongoose, { Schema, Document } from 'mongoose';

export interface INews extends Document {
  fullName: string;
  phone: string;
  email: string;
}

const NewsSchema: Schema = new Schema({
  fullName: { type: String, required: true },
  phone: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
}, { timestamps: true });

const News = mongoose.model<INews>('News', NewsSchema);

export default News;
