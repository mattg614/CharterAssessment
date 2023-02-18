const express = require('express');
const rewardsController = require('../controllers/rewardsController');

const router = express.Router();

router.post(
  '/rewards/',
  rewardsController.sanitizeInputs,
  rewardsController.calculatePoints,
  rewardsController.groupCustomers,
  rewardsController.groupTotals,
  (req, res) => {
    return res.status(200).json(res.locals.groupedTransactions);
  },
);

module.exports = router;
