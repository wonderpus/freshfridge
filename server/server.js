const express = require('express');
const path = require('path');
const fs = require('fs');
const cors = require('cors');
//const expressHbs = require('express-handlebars');
const bodyparser = require('body-parser');

const PORT = 3000;
const app = express();


// example of serving a request without a router
// serves index.html on the route '/'
app.get('/', (req, res) => {
  return res.status(200)
            .sendFile(path.join(__dirname, './index.html')); 
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