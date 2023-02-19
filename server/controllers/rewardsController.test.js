const httpMocks = require('node-mocks-http');
const {
  testSanitizeDS,
  testCalcPointsDS,
  testGroupCustomersDS,
  testGroupTotalsDS,
} = require('../../test-data/testDataSet.json');
const rewardsController = require('./rewardsController');
describe('Tests the rewardsController', () => {
  beforeEach(() => {
    req = httpMocks.createRequest();
    res = httpMocks.createResponse();
  });

  describe('Tests the sanitizeInputs method', () => {
    it('Takes in valid inputs with 3 invalid and returns in desired format', async () => {
      res.locals.fileContent = { transactions: testSanitizeDS };
      const originalLength = testSanitizeDS.length;
      await rewardsController.sanitizeInputs(req, res, (err) => {
        expect(err).toBeUndefined();
        expect(res.locals.transactions).toBeDefined();
        expect(res.locals.transactions.length).toEqual(originalLength - 4);
        expect(res.locals.transactions[0]).toEqual(
          expect.objectContaining({
            customerId: expect.anything(),
            dateTime: expect.anything(),
            transactionAmount: expect.anything(),
          }),
        );
        expect(typeof res.locals.transactions[0].customerId).toEqual('number');
        expect(typeof res.locals.transactions[0].dateTime).toEqual('object');
        expect(typeof res.locals.transactions[0].dateTime.monthYear).toEqual('string');
        expect(typeof res.locals.transactions[0].dateTime.rawDateTime).toEqual('string');
        expect(typeof res.locals.transactions[0].transactionAmount).toEqual('number');
      });
    });
  });
  describe('Tests the calculatePoints method', () => {
    it('Adds a points parameter to the transactions', async () => {
      res.locals.transactions = testCalcPointsDS;
      await rewardsController.calculatePoints(req, res, (err) => {
        expect(err).toBeUndefined();
        expect(res.locals.transactions).toBeDefined();
        expect(res.locals.transactions[0]).toEqual(
          expect.objectContaining({
            customerId: testCalcPointsDS[0].customerId,
            transactionAmount: testCalcPointsDS[0].transactionAmount,
            transactionPoints: expect.anything(),
            dateTime: expect.objectContaining({
              monthYear: testCalcPointsDS[0].dateTime.monthYear,
              rawDateTime: testCalcPointsDS[0].dateTime.rawDateTime,
            }),
          }),
        );
        expect(res.locals.transactions[0]).toBeDefined();
        expect(res.locals.transactions[1]).toBeDefined();
        expect(res.locals.transactions[2]).toBeDefined();
        expect(res.locals.transactions[3]).toBeDefined();
        expect(res.locals.transactions[4]).toBeDefined();
        expect(res.locals.transactions[0].transactionPoints).toEqual(90);
        expect(res.locals.transactions[1].transactionPoints).toEqual(40);
        expect(res.locals.transactions[2].transactionPoints).toEqual(0);
        expect(res.locals.transactions[3].transactionPoints).toEqual(50);
        expect(res.locals.transactions[4].transactionPoints).toEqual(0);
      });
    });
  });
  describe('Tests the groupCustomers method', () => {
    it('Customer Grouped Transactions placed on res.locals no error', async () => {
      res.locals.transactions = testGroupCustomersDS;
      await rewardsController.groupCustomers(req, res, (err) => {
        expect(err).toBeUndefined();
        expect(res.locals.customerGroupedTransactions).toBeDefined();
        expect(Array.isArray(res.locals.customerGroupedTransactions['1'])).toBeTruthy();
        expect(res.locals.customerGroupedTransactions['2'][0]).toEqual(
          expect.objectContaining({
            dateTime: expect.objectContaining({
              monthYear: expect.anything(),
              rawDateTime: expect.anything(),
            }),
            transactionAmount: expect.anything(),
            transactionPoints: expect.anything(),
          }),
        );
      });
    });
  });
  describe('Tests the groupTotals method', () => {
    it('groupedTransactions split by customer id with Month Totals and customer total on res.locals object', async () => {
      res.locals.customerGroupedTransactions = testGroupTotalsDS;
      await rewardsController.groupTotals(req, res, (err) => {
        expect(err).toBeUndefined();
        expect(res.locals.groupedTransactions).toBeDefined();
        console.log(res.locals.groupedTransactions);
        expect(res.locals.groupedTransactions['1'].monthTransactions['Feb 2023'].monthPts).toEqual(
          90,
        );
        expect(res.locals.groupedTransactions['1'].monthTransactions['Dec 2022'].monthPts).toEqual(
          26,
        );
        expect(res.locals.groupedTransactions['2'].monthTransactions['Jan 2023'].monthPts).toEqual(
          150,
        );
        expect(res.locals.groupedTransactions['2'].monthTransactions['Dec 2022'].monthPts).toEqual(
          50,
        );
        expect(res.locals.groupedTransactions['2'].monthTransactions['Feb 2023'].monthPts).toEqual(
          90,
        );
        expect(res.locals.groupedTransactions['1'].totalPts).toEqual(116);
        expect(res.locals.groupedTransactions['2'].totalPts).toEqual(290);
      });
    });
  });
});
