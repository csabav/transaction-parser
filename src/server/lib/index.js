import _ from 'lodash';

// Allows a promise to be passed in and the result returned
// If an error occurs, a new Error is returned
export const tryAsync = async promise => {
  return promise
    .then(result => result)
    .catch(err => {
      if (!_.isError(err)) {
        return new Error(err);
      }
      return err;
    });
};

export const printResults = (deposits, minDeposit, maxDeposit) => {
  for (const d of deposits) {
    if (d.name) {
      console.log(`Deposited for ${d.name}: count=${d.count} sum=${d.sum.toFixed(2)} USD`);
    }
  }
  console.log(`Deposited without known user: count=${deposits[0].count} sum=${deposits[0].sum.toFixed(2)}`);
  console.log(`Smallest valid deposit: ${minDeposit.toFixed(2)} USD`);
  console.log(`Largest valid deposit: ${maxDeposit.toFixed(2)} USD`);
};
