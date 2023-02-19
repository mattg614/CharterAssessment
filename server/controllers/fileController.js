/**
 * @module fileController
 */
const fs = require('fs');

const fileController = {};

fileController.readFile = (req, res, next) => {
  const { fileAddress } = req.body;
  const fileContent = JSON.parse(fs.readFileSync(fileAddress, 'utf8'));
  res.locals.fileContent = fileContent;
  return next();
};
module.exports = fileController;
