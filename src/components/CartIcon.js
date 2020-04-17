import React from 'react';

const CartIcon = ({ cart }) => {
  let total = 0;
  cart.forEach((item) => {
    total += item.quantity;
  });
  return (
    <div className="cart-icon-container">
      <svg
        className="cart-icon"
        fill="none"
        height="24"
        stroke="rgba(0, 0, 0, 0.5)"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1"
        viewBox="0 0 24 24"
        width="24"
        xmlns="http://www.w3.org/2000/svg"
      >
        <circle cx="9" cy="21" r="1" />
        <circle cx="20" cy="21" r="1" />
        <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" />
      </svg>
      {total > 0 && <div className="cart-number">{total}</div>}
    </div>
  );
};

export default CartIcon;
