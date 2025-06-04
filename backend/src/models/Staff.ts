import mongoose, { Schema, Document } from 'mongoose';

export interface IStaff extends Document {
  fullName: string;
  phone: string;
  email: string;
}

const StaffSchema: Schema = new Schema({
  fullName: { type: String, required: true },
  phone: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
}, { timestamps: true });

const Staff = mongoose.model<IStaff>('Staff', StaffSchema);

export default Staff;
