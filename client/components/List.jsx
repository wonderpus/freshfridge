import React from 'react';

const List = (props) => {
  // const [stateVariableName, setStateVariable] = useState(defaultValue);
  const type = props.type;
  const items = props.items;
  const setPriority = (item) => {
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
      const prior = setPriority(item);

      return <li key={`type${index}`}
                className={prior}>
                {`${item.name}`}
              </li>;
    });

  return (
    <div>
      { type === "grocery" ? "Grocery List" : "Fridge Contents" }
      <ol>
        {mappedItems}
      </ol>
    </div>
  )
};

export default List;
