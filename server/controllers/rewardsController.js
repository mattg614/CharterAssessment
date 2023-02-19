/**
 * @module rewardsController
 */

const format = require('date-fns/format');
const differenceInMonths = require('date-fns/differenceInMonths');
const rewardsController = {};

/**
 * @name sanitizeInputs
 * @description takes in a body composed of array of transactions
 * transactions include customerId, datetime, and transaction amount
 * sanitizeInputs checks that customerId is number, date time is type datetime and transaction amount is a dollar amount converted to floored numbers
 */
rewardsController.sanitizeInputs = (req, res, next) => {
  /**
   * Helper Functions for sanitizing customerId, dateTime and transactionAmount
   * if any of these inputs are not the correct type this transaction will be skipped
   */
  const sanitizeCustomerId = (id) => {
    //if the type of the id isn't a number or string we can immediately return null

    if (typeof id !== 'number' && typeof id !== 'string') return null;
    if (typeof id === 'number') return id;
    //if provided id is a string that is equivalent to the number version we can return number of id
    if (parseInt(id) == id) return parseInt(id);
    return null;
  };
  const sanitizeDateTime = (dateTime) => {
    try {
      const dateObj = new Date(dateTime);
      //extract out month and year for use later with seperating customer transactions by month
      const currentDate = new Date();
      if (differenceInMonths(currentDate, dateObj) > 3) return null;
      const monthYear = format(dateObj, 'MMM yyyy');
      return {
        monthYear,
        rawDateTime: dateTime,
      };
    } catch (_) {
      return null;
    }
  };
  const sanitizeTransactionAmount = (amount) => {
    if (typeof amount !== 'string' && typeof amount !== 'number') return null;
    if (typeof amount === 'string') {
      if (amount[0] === '$') amount = amount.slice(1);
    }
    return parseInt(amount);
  };
  const { transactions } = res.locals.fileContent;
  const sanitizedTransactions = [];
  transactions.forEach((transaction) => {
    const sanitizedTransaction = {};
    const {
      customer_id: customerId,
      date_time: dateTime,
      transaction_amount: transactionAmount,
    } = transaction;
    sanitizedTransaction.customerId = sanitizeCustomerId(customerId);
    sanitizedTransaction.dateTime = sanitizeDateTime(dateTime);
    sanitizedTransaction.transactionAmount = sanitizeTransactionAmount(transactionAmount);
    //skip over any elements that were returned as falsy
    if (
      !sanitizedTransaction.customerId ||
      !sanitizedTransaction.dateTime ||
      !sanitizedTransaction.transactionAmount
    ) {
      return;
    }
    sanitizedTransactions.push(sanitizedTransaction);
  });
  res.locals.transactions = sanitizedTransactions;
  return next();
};
/**
 * @name calculatePoints
 * @description utilizes transactions on locals object and calculates the points based
 * on transaction amount and adds to transactions object
 */
rewardsController.calculatePoints = (req, res, next) => {
  const { transactions } = res.locals;
  transactions.forEach((transaction) => {
    const { transactionAmount: amount } = transaction;
    let points = 0;
    if (amount > 100) {
      points += 2 * (amount - 100) + 50;
    } else if (amount > 50) {
      points += amount - 50;
    }
    transaction.transactionPoints = points;
  });
  return next();
};

/**
 * @name groupCustomers
 * @description utilizes transactions on locals object and builds a new object with the
 * elements grouped by customer id
 */
rewardsController.groupCustomers = (req, res, next) => {
  const { transactions } = res.locals;
  const customerGroupedTransactions = {};
  transactions.forEach((transaction) => {
    if (customerGroupedTransactions[transaction.customerId]) {
      customerGroupedTransactions[transaction.customerId].push({
        dateTime: transaction.dateTime,
        transactionAmount: transaction.transactionAmount,
        transactionPoints: transaction.transactionPoints,
      });
    } else {
      customerGroupedTransactions[transaction.customerId] = [
        {
          dateTime: transaction.dateTime,
          transactionAmount: transaction.transactionAmount,
          transactionPoints: transaction.transactionPoints,
        },
      ];
    }
  });
  res.locals.customerGroupedTransactions = customerGroupedTransactions;
  return next();
};
/**
 * @name groupTotals
 * @description takes the customerGroupedTransactions object and loops over each customer, then loops over each transaction and groups by Month in a seperate object, finally while
 * looping, totals are calculated to be returned to client
 */
rewardsController.groupTotals = (req, res, next) => {
  const { customerGroupedTransactions } = res.locals;
  const groupedTransactions = {};
  for (let [customerId, customerTransactions] of Object.entries(customerGroupedTransactions)) {
    let total = 0;
    groupedTransactions[customerId] = {};
    const customerData = groupedTransactions[customerId];
    customerData.monthTransactions = {};
    customerTransactions.forEach((transaction) => {
      const monthYear = transaction.dateTime.monthYear;
      if (customerData.monthTransactions[monthYear] !== undefined) {
        customerData.monthTransactions[monthYear].transactions.push({
          transaction,
        });
        customerData.monthTransactions[monthYear].monthPts += transaction.transactionPoints;
      } else {
        customerData.monthTransactions[monthYear] = {
          transactions: [transaction],
          monthPts: transaction.transactionPoints,
        };
      }
      total += transaction.transactionPoints;
    });
    groupedTransactions[customerId].totalPts = total;
  }
  res.locals.groupedTransactions = groupedTransactions;
  return next();
};
module.exports = rewardsController;
