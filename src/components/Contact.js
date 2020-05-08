import React, { useState } from 'react';
import FormGroup from 'react-bootstrap/FormGroup';
import FormControl from 'react-bootstrap/FormControl';
import Button from 'react-bootstrap/Button';
import config from '../config';

const Contact = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [buttonText, setButtonText] = useState('Send');

  const updateValue = (e, updateFcn) => {
    updateFcn(e.target.value);
    setButtonText('Send');
  };

  const validateForm = () => name.length > 0 && email.length > 0 && message.length > 0;

  const handleSubmit = (event) => {
    event.preventDefault();
    setButtonText('Sending...');
    fetch(config.emailURL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        name,
        message,
        userEmail: email,
        clientEmail: config.emailAddress,
        siteDomain: window.location.origin,
      }),
    }).then((response) => response.json()).then((json) => {
      if (json.MessageId) {
        setButtonText('Sent!');
        setName('');
        setEmail('');
        setMessage('');
      } else {
        setButtonText('Send');
        window.alert(`An error occurred with the contact form. Please send an email directly to ${config.emailAddress}.`);
      }
    });
  };

  return (
    <div>
      <h1>Contact</h1>
      <form onSubmit={handleSubmit}>
        <FormGroup controlId="name">
          <FormControl
            type="text"
            placeholder="Your Name"
            value={name}
            onChange={(e) => updateValue(e, setName)}
          />
        </FormGroup>
        <FormGroup controlId="email">
          <FormControl
            placeholder="Your Email Address"
            type="email"
            value={email}
            onChange={(e) => updateValue(e, setEmail)}
          />
        </FormGroup>
        <FormGroup controlId="message">
          <FormControl
            rows={10}
            as="textarea"
            placeholder="Your Message"
            value={message}
            onChange={(e) => updateValue(e, setMessage)}
          />
        </FormGroup>
        <Button
          block
          type="submit"
          size="lg"
          variant="outline-dark"
          disabled={!validateForm()}
        >
          {buttonText}
        </Button>
      </form>
    </div>
  );
};

export default Contact;
