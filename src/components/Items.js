import React, { useState, useEffect } from 'react';
import config from '../config';

const Items = () => {
  const [items, setItems] = useState([]);

  useEffect(() => {
    fetch(`${config.apiURL}/publishedItems/${config.userID}`).then((res) => res.json()).then(setItems);
  }, []);

  return (
    <div>
      <h1>Items Page</h1>
      <div className="items">
        {items.map((item) => (
          <div className="item">
            {item.itemName}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Items;
