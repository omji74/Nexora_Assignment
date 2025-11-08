// src/components/ProductList.js
import React from 'react';

// const ProductList = ({ products, onAddToCart }) => {
//   return (
//     <div  key={product.id} className="product-grid">
//       {products.map((product) => (
//         <div key={product.id} className="product-card">
//           <h3>{product.name}</h3>
//           <p>${product.price.toFixed(2)}</p>
//           <button onClick={() => onAddToCart(product.id, 1)}>
//             Add to Cart
//           </button>
//         </div>
//       ))}
//     </div>
//   );
// };

// export default ProductList;
// src/components/ProductList.js

const ProductList = ({ products, onAddToCart }) => {
  return (
    <div className="product-grid">
      {products.map((product) => (
        // 👇 ADD THE KEY PROP HERE
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