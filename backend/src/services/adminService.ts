import Admin, { IAdmin } from '../models/Admin';
import bcrypt from 'bcrypt';

const SALT_ROUNDS = 10;

export const createAdmin = async (username: string, password: string): Promise<IAdmin> => {
  const hashedPassword = await bcrypt.hash(password, SALT_ROUNDS);
  const newAdmin = new Admin({ username, password: hashedPassword });
  return newAdmin.save();
};

export const findAdminByUsername = async (username: string): Promise<IAdmin | null> => {
  return Admin.findOne({ username });
};

export const comparePassword = async (password: string, hashedPassword: string): Promise<boolean> => {
  return bcrypt.compare(password, hashedPassword);
};
