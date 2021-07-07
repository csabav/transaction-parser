import mongoose from 'mongoose';
import db from '../config/db';

export const Transaction = new db.model('Transaction', {
  _id: mongoose.Schema.Types.Buffer,
  _user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },
  date: { type: mongoose.Schema.Types.Date, default: Date.now },
  amount: mongoose.Schema.Types.Number,
  currency: mongoose.Schema.Types.String,
});
