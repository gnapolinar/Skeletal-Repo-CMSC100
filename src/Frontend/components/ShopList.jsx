function ShopList() {
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
    {
        _id: '3',
        productName: 'Pork',
        productType: 'Livestock',
        productPrice: 10,
        productDescription: 'Organic pork from local farms',
        productQuantity: 30,
    },
    {
      _id: '4',
      productName: 'Potato',
      productType: 'Crops',
      productPrice: 2.5,
      productDescription: 'Fresh potatoes from local farms',
      productQuantity: 100,
    },
    {
      _id: '5',
      productName: 'Chicken',
      productType: 'Poultry',
      productPrice: 8,
      productDescription: 'Organic free-range chicken',
      productQuantity: 50,
    },
    {
        _id: '6',
        productName: 'Pork',
        productType: 'Livestock',
        productPrice: 10,
        productDescription: 'Organic pork from local farms',
        productQuantity: 30,
    },

  ];

  return (
    <div>
      <h2 className="product-title">OUR PRODUCTS</h2>
      <div className="product-wrapper">
        <div className="product-list">
          {dummyProducts.map(product => (
            <div key={product._id} className="product-card">
              <img src="https://via.placeholder.com/150" alt="product" />
              <h3>{product.productName}</h3>
              <p>Price: ${product.productPrice}</p>
              <p>Description: {product.productDescription}</p>
              <button>ADD TO CART</button>
            </div>
          ))}
        </div>
      </div>  
    </div>
  );
}

export default ShopList;
