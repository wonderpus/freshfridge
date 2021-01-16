import React from 'react';
const regeneratorRuntime = require("regenerator-runtime");
import GoogleLogin from 'react-google-login';
import credentials from './secrets.js';

//We’ll use the popular react-google-login package to display a “Log in with Google” button that will handle displaying the Google login prompt and retrieving information about the user.
const GoogleAuth = () => {

  const handleLogin = async googleData => {
      const res = await fetch("/api/v1/auth/google", {  // change to 'http:localhost:8000/api/googlelogin'
          method: "POST",
          body: JSON.stringify({
          token: googleData.tokenId
        }),
        headers: {
          "Content-Type": "application/json"
        }
      })
      const data = await res.json()
      // store returned user somehow
    }
     
  return (
    <div className="GoogleAuth">
        <h1>Login with Google</h1>

        <GoogleLogin
            clientId= {credentials.clientID} 
            buttonText="Log in with Google"
            onSuccess={handleLogin}
            onFailure={handleLogin}
            cookiePolicy={'single_host_origin'}
        />
    </div>
  )
};

export default GoogleAuth;