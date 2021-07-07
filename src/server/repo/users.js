import { User as UserModel } from '../models/users';

export const getUserByAccountDetails = async (routingNumber, accountNumber) =>
  await UserModel.findOne({ 'accounts.routingNumber': routingNumber, 'accounts.accountNumber': accountNumber });
