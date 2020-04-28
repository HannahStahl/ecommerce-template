import React, { useState, useEffect } from 'react';
import FormControl from 'react-bootstrap/FormControl';
import { Elements, StripeProvider } from 'react-stripe-elements';
import config from '../config';
import CheckoutForm from './CheckoutForm';
import CheckoutSuccess from './CheckoutSuccess';

const Cart = ({ items, cart, updateCart }) => {
  const [stripe, setStripe] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [total, setTotal] = useState(0);

  useEffect(() => {
    setStripe(window.Stripe(config.stripeKey));
  }, []);

  useEffect(() => {
    if (items.length > 0 && cart.length > 0) {
      let runningTotal = 0;
      cart.forEach((item) => {
        const itemDetails = items.find((itemInList) => itemInList.itemId === item.itemId);
        if (itemDetails.itemOnSale) {
          runningTotal += itemDetails.itemSalePrice * item.quantity;
        } else {
          runningTotal += itemDetails.itemPrice * item.quantity;
        }
      });
      setTotal(runningTotal);
    }
  }, [items, cart]);

  const updateQuantity = (newQuantity, index) => {
    if ((/^(\s*|\d+)$/).test(newQuantity)) {
      const updatedCart = cart;
      updatedCart[index].quantity = parseInt(newQuantity);
      localStorage.setItem('cart', JSON.stringify(updatedCart));
      updateCart();
    }
  };

  const handleSubmit = async ({ token, error }) => {
    if (error) {
      alert(error);
      return;
    }
    setIsLoading(true);
    try {
      fetch(`${config.apiURL}/charge/${config.userID}`, {
        method: 'POST',
        body: JSON.stringify({
          amount: total,
          description: config.businessName,
          source: token.id,
        }),
      }).then((res) => res.json()).then((json) => {
        if (json.error) {
          alert('Oops! An error occurred with our payment processing system. Please use the Contact form to send us a message, and we\'ll get it straightened out right away.');
          setIsLoading(false);
        } else {
          localStorage.setItem('cart', JSON.stringify([]));
          updateCart();
          setShowSuccessModal(true);
        }
      });
    } catch (e) {
      alert(e);
      setIsLoading(false);
    }
  };

  return (
    <div>
      <h1>Cart</h1>
      {items.length > 0 && (
        cart.length > 0 ? (
          <>
            {cart.map((item, index) => (
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
            ))}
            <p>{`Total: $${total}`}</p>
            <div className="checkout-form-container">
              <StripeProvider stripe={stripe}>
                <Elements>
                  <CheckoutForm isLoading={isLoading} onSubmit={handleSubmit} />
                </Elements>
              </StripeProvider>
            </div>
          </>
        ) : <p>No items in cart</p>
      )}
      <CheckoutSuccess show={showSuccessModal} closeModal={() => setShowSuccessModal(false)} />
    </div>
  );
};

export default Cart;
