import React from 'react';

const FridgeList = ({ items, remove, move }) => {
  const setPriorityClass = (item) => {
    switch (item.priority) {
      case 1:
        return "high-priority";
      case 2:
        return "med-priority";
      case 3:
        return "low-priority";
      default:
        return "";
    }
  }

  const mappedItems = items.sort((itemA, itemB) => {
    let a = itemA.priority; 
    let b = itemB.priority;
    if (a === null) a = 4;
    if (b === null) b = 4;

    return a - b;
  })
    .map((item, index) => {
      const prior = setPriorityClass(item);

      return <li key={`type${index}`} className={prior}>
                {`${item.name}`}
                <span className="align-right">
                  <button onClick={() => move(item._id, '\'grocery\'')}> {/* ** SQL needs string parameters that are going to be concatenated onto a query to have a second pair of single quotes ** */}
                    Add to Grocery List
                  </button>
                  <button onClick={() => remove(item._id)}>
                    <i className="fas fa-trash-alt"></i>
                  </button>
                </span>
              </li>;
    });

  return (
    <div>
      <ol className='list'> Fridge Contents
        {mappedItems}
      </ol>
    </div>
  )
};

export default FridgeList;
