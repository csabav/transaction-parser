import * as fs from 'fs';
import _ from 'lodash';
import * as path from 'path';
import { validateTransaction, validateDataFile } from './validate';
import { getUserByAccountDetails } from './repo/users';
import {
  saveTransaction,
  getTransactionById,
  getTransactionsGroupedByUsers,
  getTransactionWithMaxDeposit,
  getTransactionWithMinDeposit,
} from './repo/transactions';
import { tryAsync, printResults } from './lib';
import { logger } from './lib/log';

(async () => {
  // Get all .json data files
  const dataDir = `${__dirname}/data`;
  const files = fs.readdirSync(dataDir);
  const dataFiles = _.filter(files, file => path.extname(file) === '.json');

  // Process each data file one by one
  for (const file of dataFiles) {
    // Read file and parse JSON
    const data = fs.readFileSync(`${dataDir}/${file}`);
    const parsedData = _.attempt(() => JSON.parse(data));
    if (_.isError(parsedData)) {
      logger.error(`Invalid json in ${file}`);
      continue;
    }

    // Validate data schema
    const valid = validateDataFile(parsedData);
    if (!valid) {
      logger.error(`Invalid data in ${file}: ${JSON.stringify(validateDataFile.errors)}`);
      continue;
    }

    // Get transactions from the parsed data and process them one by one
    const transactions = _.get(parsedData, 'transactions', []);
    for (const tr of transactions) {
      // Validate transaction object schema
      const valid = validateTransaction(tr);
      if (!valid) {
        logger.error(`Invalid transaction data: ${JSON.stringify(validateTransaction.errors)}`);
        continue;
      }

      // Check if transaction already exist in the transactions database collection if yes then move to next transaction
      const originalTr = await tryAsync(getTransactionById(tr.id));
      if (_.isError(originalTr)) {
        logger.error(`Transaction's prior existence could not be checked: ${tr.id}`);
        continue;
      } else if (originalTr) {
        logger.info(`Transaction has already been processed: ${tr.id}`);
        continue;
      }

      // Find user that belongs to the given accountNumber/routingNumber pair
      const user = await getUserByAccountDetails(tr.to.routing_number, tr.to.account_number);

      // Store transaction in the database
      const addResult = await tryAsync(saveTransaction(tr.id, user ? user._id : null, tr.amount.amount, tr.amount.currency));
      if (_.isError(addResult)) {
        logger.error(`Transaction could not be saved to the database: ${tr.id}`);
      }
    }
  }

  // Get minimum and maximum deposit values from the database
  let minDeposit, maxDeposit;

  const minDepositTr = await tryAsync(getTransactionWithMinDeposit());
  if (_.isError(minDepositTr)) {
    logger.error(`There was an error retrieving transaction with minimum deposit from the database: ${minDepositTr.message}`);
    minDeposit = 0;
  } else {
    minDeposit = minDepositTr ? minDepositTr.amount : 0;
  }

  const maxDepositTr = await tryAsync(getTransactionWithMaxDeposit());
  if (_.isError(maxDepositTr)) {
    logger.error(`There was an error retrieving transaction with maximum deposit from the database: ${maxDepositTr.message}`);
    maxDeposit = 0;
  } else {
    maxDeposit = maxDepositTr ? maxDepositTr.amount : 0;
  }

  // Get all deposits grouped by users
  const deposits = await tryAsync(getTransactionsGroupedByUsers());
  if (_.isError(deposits)) {
    logger.error(`There was an error retrieving user transactions from the database: ${deposits.message}`);
    process.exit(1);
  }

  // And finally print the results to the console
  printResults(deposits, minDeposit, maxDeposit);

  process.exit(0);
})();
