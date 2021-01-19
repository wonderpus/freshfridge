import React, { useState, useEffect }  from 'react';
import ListContainer from './ListContainer.jsx';
import AddItem from './AddItem.jsx';
import Auth from './Auth.jsx';
// import GoogleAuth from './GoogleAuth.jsx';

const MainContainer = () => {
  const [fetched, setFetched] = useState(false);

  return (
    <div className="MainContainer">
      <h1>FRESH FRIDGE</h1>
      <Auth />
      {/* <GoogleAuth /> */}
      <ListContainer fetched={fetched} setFetched={setFetched} />
      <AddItem setFetched={setFetched} />
    </div>
  )
};

export default MainContainer;