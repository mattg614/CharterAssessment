/**
 * @module fileController
 */
const fs = require('fs');

const fileController = {};

fileController.readFile = (req, res, next) => {
  try {
    const { fileAddress } = req.body;
    const fileContent = fs.readFileSync(fileAddress, 'utf8');
    res.locals.fileContent = JSON.parse(fileContent);
    return next();
  } catch (error) {
    return next({
      log: `Encountered error trying to load file at ${req.body.fileAddress}`,
      status: 400,
      message: {err: `Error ocurred trying to load file at ${req.boyd.fileAdress}`}
    })
  }

};
module.exports = fileController;
