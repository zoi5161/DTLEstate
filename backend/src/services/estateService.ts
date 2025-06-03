import Estate, { IEstate } from '../models/Estate';

export const createEstate = async (data: Partial<IEstate>): Promise<IEstate> => {
  const estate = new Estate(data);
  return await estate.save();
};