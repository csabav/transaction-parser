import muuid from 'uuid-mongodb';
import _ from 'lodash';
import { Transaction as TransactionModel } from '../models/transactions';
import { tryAsync } from '../lib';

export const saveTransaction = async (id, userId, amount, currency) =>
  await new TransactionModel({
    _id: muuid.from(id),
    _user: userId || null,
    amount: amount,
    currency: currency,
  }).save();

export const getTransactionById = async id => await TransactionModel.findOne({ _id: muuid.from(id) });

export const getTransactionWithMinDeposit = async () => {
  const minDepositArr = await tryAsync(TransactionModel.find().sort({ amount: 1 }).limit(1));
  if (_.isError(minDepositArr)) {
    return minDepositArr;
  }
  return minDepositArr.length ? minDepositArr[0] : null;
};

export const getTransactionWithMaxDeposit = async () => {
  const maxDepositArr = await tryAsync(TransactionModel.find().sort({ amount: -1 }).limit(1));
  if (_.isError(maxDepositArr)) {
    return maxDepositArr;
  }
  return maxDepositArr.length ? maxDepositArr[0] : null;
};

// First join the transactions and users collections
// Then replace the users array with a single object
// Then group the results by users
// And finally sort the results by the user's name
export const getTransactionsGroupedByUsers = async () =>
  await TransactionModel.aggregate([
    {
      $lookup: {
        from: 'users',
        localField: '_user',
        foreignField: '_id',
        as: 'userInfo',
      },
    },
    {
      $project: {
        userInfo: {
          $arrayElemAt: ['$userInfo', 0],
        },
        amount: '$amount',
      },
    },
    {
      $group: {
        _id: '$userInfo',
        count: { $sum: 1 },
        sum: { $sum: '$amount' },
      },
    },
    {
      $project: {
        _id: 0,
        name: '$_id.name',
        count: 1,
        sum: 1,
      },
    },
    {
      $sort: {
        name: 1,
      },
    },
  ]);
