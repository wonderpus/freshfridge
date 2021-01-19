import React, { useState } from 'react';

const Auth = () => {
  const [authStr, setAuthStr] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [password2, setPassword2] = useState('');

  const auth = (authStr) => {;

    switch(authStr) {
      case 'signup':
        return (
          <div>
            <input type="text"
                  placeholder="username"
                  value={username}
                  onChange={(event) => setUsername(event.target.value)}></input>
            <input type="password" 
                  placeholder="password"
                  value={password}
                  onChange={(event) => setPassword(event.target.value)}></input>
            <input type="password" 
                  placeholder="confirm password"
                  value={password2}
                  onChange={(event) => setPassword2(event.target.value)}></input>
            <button onClick={signUpUser}>Sign up</button>
          </div>
        );
      case 'login':
        return (
          <div>
            <input type="text"
                  placeholder="username"
                  value={username}
                  onChange={(event) => setUsername(event.target.value)}></input>
            <input type="password" 
                  placeholder="password"
                  value={password}
                  onChange={(event) => setPassword(event.target.value)}></input>
            <button onClick={logInUser}>Log in</button>
          </div>
        );
        case 'logout':
          return (
            <div>
              <button onClick={logOut}>Click to confirm log out</button>
            </div>
          );  
      default:
        return '';
    }
  }

  // click handler: initiates an http request to send the new user's information to the database
  // TODO: UX to warn user that they've entered two passwords that don't match.
  const signUpUser = () => {
    console.log('Signing up user: ', username, password, password2);

    if (password !== password2) {
      alert('Your passwords must match.');
    };

    fetch('/auth/signup', {
      method: 'PUT',
      headers: {"Content-Type": "application/json"},
      body: JSON.stringify({
        name: username,
        password: password
      })
    }).then((res) => res.json())
      .then((res) => {
      console.log("Response to sign-up PUT: ", res); 
      // TODO: Invalid signups return a json-formatted object with a message. Display that message to the user.
    }).catch((error) => console.log('ERR at sign-up POST: ', error));
  }

  const logInUser = () => {
    console.log('Did you try? Logging in user: ', username, password);

    fetch('/auth/login', {
      method: 'PUT',
      headers: {"Content-Type": "application/json"},
      body: JSON.stringify({
        name: username,
        password: password
      })
    }).then((res) => res.json())
      .then((res) => {
        console.log('Response to log-in PUT: ', res);
        // TODO: Invalid logins return a json-formatted object with a message. Display that message to the user.
    }).catch((error) => console.log('ERR at log-in POST: ', error));
  }

  const logOut = () => {

    fetch('/auth/logout', {
      method: 'PUT',
    }).then((res) => res.json())
      .then((data) => {
        console.log('Response to log-in PUT: ', data);
        // TODO: Invalid logins return a json-formatted object with a message. Display that message to the user.
    }).catch((error) => console.log('ERR at log-in POST: ', error));
  }

  return (
    <div className='loginContainer'>
      <h4>Please log in.</h4>
      {auth(authStr)}

      <select className='login'
              defaultValue="" 
              placeholder="" 
              onChange={(event) => setAuthStr(event.target.value)}>
        <option value="" disabled>log in/sign up</option>
          <option value="login">log in</option>
          <option value="signup">sign up</option>
          <option value="logout">log out</option>
      </select>

    </div>
  )
};

export default Auth;
