import React, { useState, useEffect } from 'react';
import config from '../config';

const Item = ({ match }) => {
  const [item, setItem] = useState(undefined);

  useEffect(() => {
    fetch(`${config.apiURL}/publishedItems/${config.userID}`).then((res) => res.json()).then((items) => {
      const itemName = unescape(match.params.itemName).replace(/_/g, ' ');
      const itemDetails = items.find((itemInList) => (
        itemInList.itemName.toLowerCase() === itemName.toLowerCase()
      ));
      Promise.all([
        fetch(`${config.apiURL}/itemsToPhotos/${config.userID}/${itemDetails.itemId}`).then((res) => res.json()),
        fetch(`${config.apiURL}/photos/${config.userID}`).then((res) => res.json()),
      ]).then((results) => {
        const [itemsToPhotos, photos] = results;
        const photoIds = itemsToPhotos.map((row) => row.photoId);
        itemDetails.itemPhotos = photos.filter((photo) => photoIds.includes(photo.photoId));
        setItem(itemDetails);
      });
    });
  }, [match.params.itemName]);

  return (
    <div>
      {item && (
        <>
          <h1>{item.itemName}</h1>
          <p>{item.itemDescription}</p>
          <div className="items">
            {item.itemPhotos.map((photo) => (
              <div className="item" key={photo.photoName}>
                <img
                  className="item-img"
                  src={`${config.cloudfrontURL}/${photo.photoName}`}
                  alt={item.itemName}
                />
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default Item;
