import React, { useState, useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import config from '../config';

const Item = ({ match, items, updateCart }) => {
  const [item, setItem] = useState(undefined);

  useEffect(() => {
    const itemName = unescape(match.params.itemName).replace(/_/g, ' ');
    const itemDetails = items.find((itemInList) => (
      itemInList.itemName.toLowerCase() === itemName.toLowerCase()
    ));
    setItem(itemDetails);
  }, [match.params.itemName, items]);

  const addToCart = () => {
    let cart = JSON.parse(localStorage.getItem('cart'));
    const newCartItem = { itemId: item.itemId, quantity: 1 };
    if (cart) {
      const index = cart.findIndex((itemInList) => itemInList.itemId === newCartItem.itemId);
      const currentCartItem = cart[index];
      if (currentCartItem) {
        const newQuantity = currentCartItem.quantity + parseInt(newCartItem.quantity);
        cart[index].quantity = newQuantity;
      } else {
        cart.push(newCartItem);
      }
    } else {
      cart = [newCartItem];
    }
    updateCart(cart);
  };

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
          <Button size="lg" variant="outline-dark" onClick={addToCart}>
            Add to Cart
          </Button>
        </>
      )}
    </div>
  );
};

export default Item;
