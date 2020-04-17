import React, { useState, useEffect } from 'react';
import config from '../config';

const Item = ({ match, items }) => {
  const [item, setItem] = useState(undefined);

  useEffect(() => {
    const itemName = unescape(match.params.itemName).replace(/_/g, ' ');
    const itemDetails = items.find((itemInList) => (
      itemInList.itemName.toLowerCase() === itemName.toLowerCase()
    ));
    setItem(itemDetails);
  }, [match.params.itemName, items]);

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
