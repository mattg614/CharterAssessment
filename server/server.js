const express = require('express');
const app = express();
const PORT = 3000;

const apiRouter = require('./routes/api');
app.use('/api', apiRouter);

// app.get('/', (req, res) => res.json('Test Express Connection'));

app.listen(PORT, () => console.log('Server listening on port 3000.'));
