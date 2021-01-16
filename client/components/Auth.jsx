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

    fetch('/signup', {
      method: 'PUT',
      body: {
        name: username,
        password
      }
    }).then((res) => res.json())
      .then((data) => {
        console.log('Response to sign-up PUT: ', data);
        // TODO: Invalid signups return a json-formatted object with a message. Display that message to the user.
    }).catch((error) => console.log('ERR at sign-up PUT: ', error));
  }

  const logInUser = () => {
    console.log('Logging in user: ', username, password);

    fetch('/login', {
      method: 'POST',
      body: {
        name: username,
        password,
      }
    }).then((res) => res.json())
      .then((data) => {
        console.log('Response to log-in PUT: ', data);
        // TODO: Invalid logins return a json-formatted object with a message. Display that message to the user.
    }).catch((error) => console.log('ERR at log-in PUT: ', error));
  }

  return (
    <div>
      <p>Please log in.</p>
      {auth(authStr)}

      <select defaultValue="" 
              placeholder="" 
              onChange={(event) => setAuthStr(event.target.value)}>
        <option value="" disabled>log in/sign up</option>
          <option value="login">log in</option>
          <option value="signup">sign up</option>
      </select>

    </div>
  )
};

export default Auth;
