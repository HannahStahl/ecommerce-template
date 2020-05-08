import React, { useState } from 'react';
import Select from 'react-select';
import Form from 'react-bootstrap/Form';
import FormGroup from 'react-bootstrap/FormGroup';
import FormControl from 'react-bootstrap/FormControl';
import Button from 'react-bootstrap/Button';
import { CardElement, injectStripe } from 'react-stripe-elements';

const CheckoutForm = ({ isLoading, onSubmit, ...props }) => {
  const [name, setName] = useState('');
  const [isCardComplete, setIsCardComplete] = useState(false);
  const [address, setAddress] = useState('');
  const [addressDetailsFocused, setAddressDetailsFocused] = useState(false);
  const [city, setCity] = useState('');
  const [state, setState] = useState('');
  const [zip, setZip] = useState('');
  const [email, setEmail] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);

  const states = [
    'AK', 'AL', 'AR', 'AZ', 'CA', 'CO', 'CT', 'DE', 'FL', 'GA', 'HI', 'IA', 'ID', 'IL', 'IN', 'KS', 'KY',
    'LA', 'MA', 'MD', 'ME', 'MI', 'MN', 'MO', 'MS', 'MT', 'NC', 'ND', 'NE', 'NH', 'NJ', 'NM', 'NV', 'NY',
    'OH', 'OK', 'OR', 'PA', 'RI', 'SC', 'SD', 'TN', 'TX', 'UT', 'VA', 'VT', 'WA', 'WI', 'WV', 'WY',
  ];
  const stateOptions = states.map((stateInList) => ({ value: stateInList, label: stateInList }));

  const updateZip = (newZip) => {
    if (newZip.match(/^\d{0,5}$/)) setZip(newZip);
  };

  const validateForm = () => (
    name !== ''
    && isCardComplete
    && address !== ''
    && city !== ''
    && state !== ''
    && zip.length === 5
    && email !== ''
  );

  const handleSubmitClick = async (event) => {
    event.preventDefault();
    setIsProcessing(true);
    const { token, error } = await props.stripe.createToken({ name });
    setIsProcessing(false);
    onSubmit({
      token, error, name, email, address, city, state: state.value, zip,
    });
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
            fontWeight: 300,
            color: '#495057',
            fontFamily: "'Manrope', sans-serif",
          },
        }}
      />
      <FormGroup size="lg" controlId="address">
        <FormControl
          type="text"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
          placeholder="Shipping address"
        />
      </FormGroup>
      <Form.Row className={addressDetailsFocused ? 'focused' : undefined}>
        <FormGroup size="lg" controlId="city" className="address-line-2 city-input">
          <FormControl
            type="text"
            value={city}
            onFocus={() => setAddressDetailsFocused(true)}
            onBlur={() => setAddressDetailsFocused(false)}
            onChange={(e) => setCity(e.target.value)}
            placeholder="City"
          />
        </FormGroup>
        <FormGroup size="lg" controlId="state" className={`address-line-2 state-input${state === '' ? ' placeholder' : ''}`}>
          <Select
            options={stateOptions}
            value={state}
            onFocus={() => setAddressDetailsFocused(true)}
            onBlur={() => setAddressDetailsFocused(false)}
            onChange={(value) => setState(value)}
            placeholder="State"
            components={{ IndicatorSeparator: () => null }}
            styles={{
              control: (base) => ({
                ...base,
                border: 'none',
                boxShadow: 'none',
              }),
            }}
          />
        </FormGroup>
        <FormGroup size="lg" controlId="zip" className="address-line-2 zip-input">
          <FormControl
            type="text"
            value={zip}
            onFocus={() => setAddressDetailsFocused(true)}
            onBlur={() => setAddressDetailsFocused(false)}
            onChange={(e) => updateZip(e.target.value)}
            placeholder="Zip"
          />
        </FormGroup>
      </Form.Row>
      <FormGroup size="lg" controlId="email">
        <FormControl
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email address"
        />
      </FormGroup>
      <Button
        block
        type="submit"
        size="lg"
        variant="outline-dark"
        disabled={!validateForm()}
      >
        {isLoading || isProcessing ? 'Placing Order...' : 'Place Order'}
      </Button>
      <div className="payment-note">
        <i className="fas fa-lock" />
        <span>
          {' '}
          Secure payment processing by
          {' '}
          <a href="https://stripe.com" target="_blank" rel="noopener noreferrer">Stripe</a>
        </span>
      </div>
    </form>
  );
};

export default injectStripe(CheckoutForm);
