const express = require('express');
const path = require('path');
const fs = require('fs');
const cors = require('cors');
//const expressHbs = require('express-handlebars');
const bodyparser = require('body-parser');

//require model for query
const db = require('./models/freshModel');

const PORT = 3000;
const app = express();


// example of serving a request without a router
// serves index.html on the route '/'
app.get('/', (req, res) => {
  return res.status(200).sendFile(path.join(__dirname, './index.html')); 
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


/*
// const router = express.Router();
// routes all API requests through api.js
app.use('/api', apiRouter);
// example of using a router to serve a request
router.put('/api/comments',
  feedController.addComment,    // <-- key difference: can list callback functions as parameters of a router method
  (req, res) => {
    res.status(200).json({status: "okay"});
  }
)
*/

app.listen(PORT, () => {
  console.log(`Server listening on port: ${PORT}...`);
});

module.exports = app;