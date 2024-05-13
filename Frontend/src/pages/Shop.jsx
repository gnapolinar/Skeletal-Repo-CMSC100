import { useState, useEffect } from 'react';
import axios from 'axios';

const Shop = () => {
  const [products, setProducts] = useState([]);
  const [quantity, setQuantity] = useState({});

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const response = await axios.get('http://localhost:4000/api/products');
      setProducts(response.data);
      const initialQuantity = {};
      response.data.forEach(product => {
        initialQuantity[product.productID] = 1;
      });
      setQuantity(initialQuantity);
    } catch (error) {
      console.error('Error fetching products:', error);
    }
  };

  const addToCart = (product) => {
    const productId = product.productID;
    const newQuantity = quantity[productId] || 1;
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    const existingIndex = cart.findIndex(item => item.productID === productId);
    if (existingIndex !== -1) {
      cart[existingIndex].quantity += newQuantity;
    } else {
      cart.push({ ...product, productID: productId, quantity: newQuantity });
    }
    localStorage.setItem('cart', JSON.stringify(cart));
    console.log(`Added to cart: ${product.productName} - Quantity: ${newQuantity}`);
  };

  return (
    <div>
      <h1>Shop</h1>
      {products.length > 0 ? (
        <ul>
          {products.map((product) => (
            <li key={product.productID}>
              <div>
                <span>{product.productName} - {product.productDesc}</span>
                <input
                  type="number"
                  value={quantity[product.productID]}
                  onChange={(e) => setQuantity({...quantity, [product.productID]: parseInt(e.target.value)})}
                  min="1"
                  style={{ width: '40px' }}
                />
                <button onClick={() => addToCart(product)}>Add to Cart</button>
              </div>
            </li>
          ))}
        </ul>
      ) : (
        <p>There are currently no items.</p>
      )}
    </div>
  );
};

export default Shop;