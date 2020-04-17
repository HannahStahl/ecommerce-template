import React from 'react';
import FormControl from 'react-bootstrap/FormControl';

const Cart = ({ items, cart, updateCart }) => {
  const updateQuantity = (newQuantity, index) => {
    if ((/^(\s*|\d+)$/).test(newQuantity)) {
      const updatedCart = cart;
      updatedCart[index].quantity = parseInt(newQuantity);
      localStorage.setItem('cart', JSON.stringify(updatedCart));
      updateCart();
    }
  };

  return (
    <div>
      <h1>Cart</h1>
      {items.length > 0 && (
        cart.length > 0 ? (
          cart.map((item, index) => (
            <div key={item.itemId} className="cart-item">
              <p className="cart-item-name">
                {items.find((itemInList) => itemInList.itemId === item.itemId).itemName}
              </p>
              <FormControl
                type="text"
                value={item.quantity}
                onChange={(e) => updateQuantity(e.target.value, index)}
                className="cart-item-quantity"
              />
            </div>
          ))
        ) : <p>No items in cart</p>
      )}
    </div>
  );
};

export default Cart;
