import React from 'react';
import ListContainer from './ListContainer.jsx';
import AddItem from './AddItem.jsx';
import Auth from './Auth.jsx';
import GoogleAuth from './GoogleAuth.jsx';

const MainContainer = () => {
  return (
    <div className="MainContainer">
      <h1>Fresh Fridge</h1>
      <Auth />
      {/* <GoogleAuth /> */}
      <ListContainer />
      <AddItem />
    </div>
  )
};

export default MainContainer;