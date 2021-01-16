import React from 'react';
import ListContainer from './ListContainer.jsx';
import AddItem from './AddItem.jsx';
import Auth from './Auth.jsx';

const MainContainer = () => {
  return (
    <div className="MainContainer">
      <h1>Fresh Fridge</h1>
      <Auth />
      <ListContainer />
      <AddItem />
    </div>
  )
};

export default MainContainer;