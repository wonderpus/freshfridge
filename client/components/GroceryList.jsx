import React from 'react';

const GroceryList = ({ items, remove, move }) => {
  // each item = { name, priority, location, _id }

  const mappedItems = items.map((item, index) => {
    return <li key={`type${index}`}>
              {`${item.name}`}
              <span className="align-right">
                <button onClick={() => remove(item._id)}><i className="fas fa-trash-alt"></i></button>
                <button onClick={() => move(item._id, '\'fridge\'')}><i className="far fa-check-circle"></i></button>
              </span>
            </li>;
    });

  return (
    <div>
      <ol> Grocery List
        {mappedItems}
      </ol>
    </div>
  )
};

export default GroceryList;
