import React, { useState, useEffect } from 'react';
import config from '../config';

const Items = () => {
  const [items, setItems] = useState([]);

  useEffect(() => {
    Promise.all([
      fetch(`${config.apiURL}/publishedItems/${config.userID}`).then((res) => res.json()),
      fetch(`${config.apiURL}/itemsToPhotos/${config.userID}`).then((res) => res.json()),
      fetch(`${config.apiURL}/photos/${config.userID}`).then((res) => res.json()),
    ]).then((results) => {
      const [itemsList, itemsToPhotos, photos] = results;
      itemsList.forEach((item, index) => {
        const photoIds = itemsToPhotos
          .filter((row) => row.itemId === item.itemId)
          .map((row) => row.photoId);
        const itemPhoto = photos.find((photoInList) => photoInList.photoId === photoIds[0]);
        itemsList[index].itemPhoto = itemPhoto.photoName;
      });
      setItems(itemsList);
    });
  }, []);

  return (
    <div>
      <h1>Items Page</h1>
      <div className="items">
        {items.map((item) => (
          <div key={item.itemId} className="item">
            <img src={`${config.cloudfrontURL}/${item.itemPhoto}`} alt={item.itemName} className="item-img" />
            <h3>{item.itemName}</h3>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Items;
