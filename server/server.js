const express = require('express');
const path = require('path');
const fs = require('fs');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const authRouter = require('./routes/authRouter.js');
const listRouter = require('./routes/listRouter.js');

//require model for query
const db = require('./models/freshModel');
const PORT = 3000;
const app = express();

app.use(cookieParser());
app.use(express.json());    // parses request bodies same as body-parser

//Any requests to auth will be handled within authRouter.js
app.use('/auth', authRouter);

//Any requests to list will be handled within listRouter.js
app.use('/lists', listRouter);

// serve index.html on the route '/'
app.get('/', (req, res) => {
  return res.status(200).sendFile(path.join(__dirname, '../index.html')); 
});


//testing our query 
app.get('/testGet', (req, res) => {
  const query = 'SELECT * FROM users'
  db.query(query, (err, data) => {
    if(err) {
      console.log(err);
      return res.send(err);
    }
    else {
      console.log(data);
      return res.send(data.rows);
    }
  })
});


// default error handler
app.use((err, req, res, next) => {
  const defaultErr = {
    log: 'Express error handler caught unknown middleware error',
    status: 500,
    message: { err: 'An error occurred' },
  };
  const errorObj = Object.assign({}, defaultErr, err);
  console.log(errorObj.log);
  return res.status(errorObj.status).json(errorObj.message);
});

app.listen(PORT, () => {
  console.log(`Server listening on port: ${PORT}...`);
});


// module.exports = app;