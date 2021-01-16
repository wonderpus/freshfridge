const { OAuth2Client } = require('google-auth-library')
const credentials = require('../client/components/secrets.js');

const express = require('express');
const path = require('path');
const cors = require('cors');
const bodyparser = require('body-parser');
const app = express();
const router = express.Router();

/*This handles POST requests to /api/v1/auth/google , verifying and decoding the token, 
pulling out the three pieces of information we want to store,
performs an upsert operation on our database, 
and returns the retrieved user as JSON.
*/
const client = new OAuth2Client(credentials.clientID)

// TODO: make controllers and import here.
router.post("/api/v1/auth/google",    
    getToken,
    findUser,
    (req, res) => res.status(201).json(res.locals.user)
);


//Here’s some middleware that we can check the currently signed in user by accessing req.session.userId, and send an unauthorised response if it isn’t set.
app.use(async (req, res, next) => {
    // const user = await db.user.findFirst({where: { id:  req.session.userId }})
    // req.user = user
    // next()
})


//a route to simply return the currently logged in user:
app.get("/me", async (req, res) => {
    res.status(200).json(req.user);
})


export default client;

// LOGIN MIDDLEWARE PIECES

// getToken controller
// async (req, res) => {
//     const { token }  = req.body
//     const ticket = await client.verifyIdToken({
//         idToken: token,
//         audience: credentials.ClientID
//     });
//     const { name, email, picture } = ticket.getPayload(); 

// findUser controller
// query our database to find this user
// db.query(...);
// information on user returned from database
// req.session.userId = user.id;







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