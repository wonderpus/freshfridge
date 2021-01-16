const { OAuth2Client } = require('google-auth-library')


const express = require('express');
const path = require('path');
const cors = require('cors');
const bodyparser = require('body-parser');
const app = express();

//Here’s some middleware that we can check the currently signed in user by accessing req.session.userId, and send an unauthorised response if it isn’t set.
app.use(async (req, res, next) => {
    const user = await db.user.findFirst({where: { id:  req.session.userId }})
    req.user = user
    next()
})

//if their account is removed from our database, their access is immediately revoked.
app.delete("/api/v1/auth/logout", async (req, res) => {
    await req.session.destroy()
    res.status(200)
    res.json({
        message: "Logged out successfully"
    })
})

//a route to simply return the currently logged in user:
app.get("/me", async (req, res) => {
    res.status(200)
    res.json(req.user)
})



/*This handles POST requests to /api/v1/auth/google , verifying and decoding the token, 
pulling out the three pieces of information we want to store,
performs an upsert operation on our database, 
and returns the retrieved user as JSON.
*/
const client = new OAuth2Client(process.env.clientID)
app.post("/api/v1/auth/google", async (req, res) => {
    const { token }  = req.body
    const ticket = await client.verifyIdToken({
        idToken: token,
        audience: process.env.googleClientID
    });
    const { name, email, picture } = ticket.getPayload();    
    const user = await db.user.upsert({ 
        where: { email: email },
        update: { name, picture },
        create: { name, email, picture }
    })

    req.session.userId = user.id
    

    req.session.userId = user.id
    
    res.status(201)
    res.json(user)
})

export default client;