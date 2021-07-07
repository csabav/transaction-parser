import mongoose from 'mongoose';
import db from '../config/db';

const AccountSchema = new mongoose.Schema({
  routingNumber: { type: mongoose.Schema.Types.String, required: true },
  accountNumber: { type: mongoose.Schema.Types.String, required: true },
});

export const User = db.model('User', {
  name: { type: mongoose.Schema.Types.String, required: true },
  accounts: [AccountSchema],
});
