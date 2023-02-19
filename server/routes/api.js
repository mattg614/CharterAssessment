const express = require('express');
const rewardsController = require('../controllers/rewardsController');
const fileController = require('../controllers/fileController');

const router = express.Router();

router.post(
  '/rewards/',
  fileController.readFile,
  rewardsController.sanitizeInputs,
  rewardsController.calculatePoints,
  rewardsController.groupCustomers,
  rewardsController.groupTotals,
  (req, res) => {
    return res.status(200).json(res.locals.groupedTransactions);
  },
);

module.exports = router;
