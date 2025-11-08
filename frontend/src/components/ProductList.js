// src/components/ProductList.js
import React from 'react';

const ProductList = ({ products, onAddToCart }) => {
  return (
    <div className="product-grid">
      {products.map((product) => (
        <div key={product.id} className="product-card">
          <h3>{product.name}</h3>
          <p>${product.price.toFixed(2)}</p>
          <button onClick={() => onAddToCart(product.id, 1)}>
            Add to Cart
          </button>
        </div>
      ))}
    </div>
  );
};

export default ProductList;