import React from 'react';
import config from '../config';

const Items = ({ items }) => (
  <div>
    <h1>Items</h1>
    <div className="items">
      {items.map((item) => (
        <a
          key={item.itemId}
          href={escape(`/items/${item.itemName.replace(/ /g, '_').toLowerCase()}`)}
          className="item"
        >
          <img
            src={`${config.cloudfrontURL}/${item.itemPhotos[0].photoName}`}
            alt={item.itemName}
            className="item-img"
          />
          <h3>{item.itemName}</h3>
        </a>
      ))}
    </div>
  </div>
);

export default Items;
