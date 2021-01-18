import React, { useState, useEffect }  from 'react';
import List from './List.jsx';

const ListContainer = ({fetched, setFetched}) => {
  const [items, setItems] = useState([{}]);
  // const [fetched, setFetched] = useState(false);
  // format of data received from database: [ { name, priority, location, id } ]

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
        setFetched(true);
    }).catch((error) => console.log('ERR at List.jsx GET list: ', error));
  }, [fetched]);      
  // TODO: does useEffect work with 1D objects in the dependency array, or does it need primitive data types?

  const fridgeArr = [];
  const groceryArr = [];
  items.forEach(item => {
    if (item.location === 'fridge') fridgeArr.push(item);
    if (item.location === 'grocery') groceryArr.push(item);
  })

  return (
    <div>
      <List type={"fridge"} items={fridgeArr}/>
      <List type={"grocery"} items={groceryArr}/>
    </div>
  )
};

export default ListContainer;