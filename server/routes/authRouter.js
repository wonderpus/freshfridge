const { OAuth2Client } = require('google-auth-library')
const credentials = require('../../client/components/secrets.js');
const express = require('express');
const router = express.Router();
const cookieParser = require('cookie-parser');
const authController = require('../controllers/authController.js');
const listController = require('../controllers/listController.js');

const app = express();
app.use(cookieParser());
app.use(express.json()); 

// vanilla log in
router.put('/login',    
  authController.findUser,
  authController.setCookie,
  listController.getList,
  (req, res) => res.status(201).json(res.locals.user_id) // todo: what should be sent back on the response?
);

router.put('/signup',
  authController.getAllUsers,
  authController.checkUniqueness,    
  authController.addUser,
  authController.findUser,
  authController.setCookie,
  listController.getList,
  (req, res) => res.status(201).json(res.locals.user_id) // todo: what should be sent back on the response?
);

router.get('/users',
  authController.getAllUsers,
  (req, res) => res.status(200).json(res.locals.allUsers)
)

/* 
TODO

Handle POST requests coming from the Google OAuth widget, verifying and decoding the token, pulling out the pieces of information from the user's Google account that we want to store, then performing an upsert operation on our database to find * and update * those pieces of information in the user's record if applicable. Return the retrieved user as JSON.
*/
const client = new OAuth2Client(credentials.clientID)

// log in with google
router.post('/login-google',
    authController.findUser,
    authController.getToken,
    (req, res) => res.status(201).json(res.locals.user_id) // todo: what should be sent back on the response?
);




module.exports = router;




//stretch goal
//if their account is removed from our database, their access is immediately revoked.
/*
app.delete("/api/v1/auth/logout", async (req, res) => {
    await req.session.destroy()
    res.status(200)
    res.json({
        message: "Logged out successfully"
    })
})
*/