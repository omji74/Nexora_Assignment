// src/components/CheckoutModal.js
import React from 'react';

const CheckoutModal = ({ receipt, onClose }) => {
  if (!receipt) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <h2>Checkout Successful!</h2>
        <p>Thank you for your purchase, {receipt.customerName}.</p>
        <p>
          A confirmation has been sent to {receipt.customerEmail}.
        </p>
        <h3>Receipt Details (ID: {receipt.receiptId})</h3>
        {/* Using <pre> for easy formatted display of the object */}
        <pre>{JSON.stringify(receipt, null, 2)}</pre>
        <button onClick={onClose}>Close</button>
      </div>
    </div>
  );
};

export default CheckoutModal;