import React, { useState, useEffect }  from 'react';
import List from './List.jsx';

const ListContainer = () => {
  const [items, setItems] = useState({ 
    fridge: [{ name: 'lemons', priority: 2 }, { name: 'milk', priority: 1 }, { name: 'beans', priority: null }],
    grocery: [{ name: 'chilis', priority: 2 }] });

  // useEffect hook replaces componentDidMount and componentDidUpdate
  // fires every single time one of the variables in the dependency array changes value
  // useEffect(callback, [dependencyArray]);
  useEffect(() => {
    // get items from the database: initiate an http request
    fetch('/lists/', {
      method: 'GET',
    }).then((res) => res.json())
      .then((data) => {
        console.log('Heres your data: ', data);
        // set state with the fetched array
        setItems(data);
    }).catch((error) => console.log('ERR at List.jsx GET list: ', error));
  }, [...items.fridge, ...items.grocery]);      // TODO: does useEffect work with 1D objects in the dependency array?

  return (
    <div>
      <List type={"fridge"} items={items.fridge}/>
      <List type={"grocery"} items={items.grocery}/>
    </div>
  )
};

export default ListContainer;