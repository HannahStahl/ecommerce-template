import React, { useState } from 'react';
import FormGroup from 'react-bootstrap/FormGroup';
import FormControl from 'react-bootstrap/FormControl';
import Button from 'react-bootstrap/Button';
import { CardElement, injectStripe } from 'react-stripe-elements';

const CheckoutForm = ({ isLoading, onSubmit, ...props }) => {
  const [name, setName] = useState('');
  const [isCardComplete, setIsCardComplete] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);

  const validateForm = () => name !== '' && isCardComplete;

  const handleSubmitClick = async (event) => {
    event.preventDefault();
    setIsProcessing(true);
    const { token, error } = await props.stripe.createToken({ name });
    setIsProcessing(false);
    onSubmit({ token, error });
  };

  return (
    <form className="checkout-form" onSubmit={handleSubmitClick}>
      <FormGroup size="lg" controlId="name">
        <FormControl
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Name on card"
        />
      </FormGroup>
      <CardElement
        className="card-field"
        onChange={(e) => setIsCardComplete(e.complete)}
        style={{
          base: {
            fontSize: '16px',
            color: '#495057',
            fontFamily: `-apple-system, BlinkMacSystemFont, "Segoe UI", "Roboto", "Oxygen",
              "Ubuntu", "Cantarell", "Fira Sans", "Droid Sans", "Helvetica Neue",
              sans-serif`,
          },
        }}
      />
      <Button
        block
        type="submit"
        size="lg"
        variant="outline-dark"
        disabled={!validateForm()}
      >
        {isLoading || isProcessing ? 'Placing Order...' : 'Place Order'}
      </Button>
    </form>
  );
};

export default injectStripe(CheckoutForm);
