const { OAuth2Client } = require('google-auth-library')
const credentials = require('../../client/components/secrets.js');

const express = require('express');
// const path = require('path');
// const cors = require('cors');
const bodyparser = require('body-parser');
//const app = express();
const router = express.Router();
const authController = require('../controllers/authController.js');

/*This handles POST requests to /api/v1/auth/google , verifying and decoding the token, 
pulling out the three pieces of information we want to store,
performs an upsert operation on our database, 
and returns the retrieved user as JSON.
*/
const client = new OAuth2Client(credentials.clientID)


// ROUTER METHODS
// vanilla log in
router.put('/login',    
    authController.findUser,
    authController.setCookie,
    (req, res) => res.status(201).json(res.locals.user_id) // todo: what should be sent back on the response?
);

router.put('/signup',
    authController.checkUniqueness,    
    authController.addUser,
    authController.findUser,
    authController.setCookie,
    (req, res) => res.status(201).json(res.locals.user_id) // todo: what should be sent back on the response?
);

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