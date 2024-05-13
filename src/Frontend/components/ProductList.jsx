import React from 'react';

function ProductList() {
  // dummy data for testing
  const dummyProducts = [
    {
      _id: '1',
      productName: 'Tomato',
      productType: 'Crops',
      productPrice: 2.5,
      productDescription: 'Fresh tomatoes from local farms',
      productQuantity: 100,
    },
    {
      _id: '2',
      productName: 'Chicken',
      productType: 'Poultry',
      productPrice: 8,
      productDescription: 'Organic free-range chicken',
      productQuantity: 50,
    },

  ];

  return (
    <div>
      <h2>Product Listings</h2>
      <div className="product-list">
        {dummyProducts.map(product => (
          <div key={product._id} className="product-card">
            <h3>{product.productName}</h3>
            <p>Type: {product.productType}</p>
            <p>Price: ${product.productPrice}</p>
            <p>Description: {product.productDescription}</p>
            <p>Quantity Available: {product.productQuantity}</p>
            <button>Add Product</button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ProductList;
