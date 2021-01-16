import React, { useState } from 'react';

const Auth = () => {
  const [authStr, setAuthStr] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [password2, setPassword2] = useState('');

  const auth = (authStr) => {
    switch(authStr){
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

  const signUpUser = () => {
    console.log('Signing up user: ', username);
  }

  const logInUser = () => {
    console.log('Logging in user: ', username);
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