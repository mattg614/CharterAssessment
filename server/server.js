const express = require('express');
const path = require('path');
const app = express();
const PORT = 3000;

//routes
const api = require('./routes/api');

//parse request body
app.use(express.json());

//begin routes
app.use('/api', api);

//catch 404 and forward to error handler
app.use((req, res, next) => {
  return res.status(404).sendFile(path.resolve(__dirname, '../client/public/404.html'));
});

//global error handler
/**
 * GLOBAL ERROR HANDLER
 * This middleware gets called if any argument is passed into next()
 */
app.use((err, req, res, next) => {
  const defaultErr = {
    log: 'Express error handler caught unknown error',
    status: 500,
    message: { err: 'An error occurred' },
  };
  const errObj = { ...defaultErr, ...err };
  console.log(errObj.log);
  return res.status(errObj.status).json(errObj.message);
})

app.listen(PORT, () => console.log('Server listening on port 3000.'));
