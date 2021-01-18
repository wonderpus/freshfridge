import React, { useState, useEffect }  from 'react';
import GroceryList from './GroceryList.jsx';
import FridgeList from './FridgeList.jsx';

const ListContainer = ({fetched, setFetched}) => {
  const [items, setItems] = useState([{}]);
  // format of data received from database: [ { name, priority, location, _id } ]
  
  // useEffect hook replaces componentDidMount and componentDidUpdate
  // fires every single time one of the variables in the dependency array changes value
  // useEffect(callback, [dependencyArray]);
  useEffect(() => {
    // get items from the database: initiate an http request
    fetch('/lists', {
      method: 'GET',
    }).then((res) => res.json())
      .then((data) => {
        console.log('List of all items owned by this user: ', data);
        // set state with the fetched array
        setItems(data);
        setFetched(true);
    }).catch((error) => console.log('ERR at List.jsx GET: ', error));
  }, [fetched]);
  
  const removeItem = (_id) => {
    const reqBody = {
      id: _id
    };
    console.log('removeItem request: ', reqBody);

    fetch('/lists', {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(reqBody)
    }).then((res) => res.json())
      .then((data) => {
        console.log('Response to DELETE: ', data);
        // set state with the fetched array
        // setItems(data);
        setFetched(false);
    }).catch((error) => console.log('ERR at ListContainer.jsx DELETE: ', error));
  }

  const moveItem = (_id, destination) => {
    const reqBody = {
      set: "location",
      newVal: destination,
      id: _id
    };

    console.log('moveItem request: ', reqBody);

    fetch('/lists', {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(reqBody)
    }).then((res) => res.json())
      .then((data) => {
        console.log('Response to PATCH: ', data);
        // set state with the fetched array
        // setItems(data);
        setFetched(false);
    }).catch((error) => console.log('ERR at ListContainer.jsx PATCH: ', error));
  }

  const fridgeArr = [];
  const groceryArr = [];
  items.forEach(item => {
    if (item.location === 'fridge') fridgeArr.push(item);
    if (item.location === 'grocery') groceryArr.push(item);
  })

  return (
    <div>
      <FridgeList items={fridgeArr} remove={removeItem} move={moveItem}/>
      <GroceryList items={groceryArr} remove={removeItem} move={moveItem}/>
    </div>
  )
};

export default ListContainer;