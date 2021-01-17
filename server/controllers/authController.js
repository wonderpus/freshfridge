const db = require('../models/freshModel.js');

const authController = {};

authController.findUser = (req, res, next) => {
  // query our database with username and password to find this user. We want to get their user id.
  const { name, password } = req.body;
  console.log('Name and password received at authController.findUser: ', name, password);

  // query for the _id on users table that matches the received name and password
  const query = {
    text: `SELECT _id
    FROM users
    WHERE name=$1 AND password=$2`,
    values: [name, password]
  }

  db.query(query, (error, result) => {
    if (error) {
      console.log('findUser ERROR: ', error);
      return next(error);
    }

    console.log('findUser query result: ', result.rows);
    // if the response from the database is an empty array, that means no user was found with that name and password
    if (!result.rows.length) {
      return res.status(203).send('Invalid login.');
    }
    else {
      // Add the found user id to res.locals so that it can be used by the next middleware.
      res.locals.user_id = result.rows[0]._id;
      return next();
    }
  });
};

// query database to find out if a record already exists on users table with that username
authController.checkUniqueness = (req, res, next) => {
  const { name } = req.body;
  console.log('Name and password received at authController.checkUniqueness: ', req.body);

  // query for the _id on users table that matches the received name and password
  const query = 'SELECT _id FROM users WHERE name=' + name

  db.query(query, (error, result) => {
    if (error) {
      console.log('checkUniqueness ERROR: ', error);
      return next(error);
    }

    console.log('checkUniqueness query result: ', result.rows);
    // if the response from the database is an empty array, that means no user was found with that username. User may continue sign-up process.
    if (!result.rows.length) {
      return next();
    }
    else {
      return res.status(203).send('An account with that username already exists. Please log in or try a different username.');
    }
  });
};

authController.addUser = (req, res, next) => {
  // add this user to the database. We want to get their user id.
  const { name, password } = req.body;
  console.log('Name and password received at authController.addUser: ', name, password);

  // query for the _id on users table that matches the received name and password
  const query = {
    text: `INSERT INTO users
    VALUES $1, $2`,
    values: [name, password]
  };

  db.query(query, (error, result) => {
    if (error) {
      console.log('addUser ERROR: ', error);
      return next(error);
    }

    console.log('addUser query result: ', result.rows);
    return next();
  });
};


// --> make a cookie
// res.cookie('user_id', 'queried user id')
// information on user returned from database
// req.cookies.userId = user.id; 

authController.setCookie = (req, res, next) => {
  console.log('Executing setCookie');
  res.cookie('user_id', res.locals.user_id);
  return next();
};

// TODO: this is Google OAuth stuff.
authController.getToken = (req, res, next) => {
  console.log('Executing getToken');
  // const { token }  = req.body
  // const ticket = await client.verifyIdToken({
  //   idToken: token,
  //   audience: credentials.ClientID
  // });
  
  // const { name, email, picture } = ticket.getPayload();
  return next();
}


module.exports = authController;