import React from 'react';
import Modal from 'react-bootstrap/Modal';

const CheckoutSuccess = ({ show, closeModal }) => (
  <Modal show={show} onHide={closeModal} className="checkout-success" centered>
    <Modal.Header closeButton />
    <Modal.Body>
      <p>Thanks for your order!</p>
      <a href="/items">Back to shop</a>
    </Modal.Body>
  </Modal>
);

export default CheckoutSuccess;
