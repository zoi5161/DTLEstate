import Staff, { IStaff } from '../models/Staff';

class StaffService {
  async createStaff(fullName: string, phone: string, email: string): Promise<IStaff> {
    const newStaff = new Staff({ fullName, phone, email });
    return await newStaff.save();
  }
}

export default new StaffService();
