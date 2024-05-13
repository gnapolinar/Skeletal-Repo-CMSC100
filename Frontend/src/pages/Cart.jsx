import { useState, useEffect } from 'react';
import axios from 'axios';

const Cart = () => {
  const [cartItems, setCartItems] = useState([]);
  const [isConfirmationOpen, setIsConfirmationOpen] = useState(false);

  useEffect(() => {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    setCartItems(cart);
  }, []);

  const removeFromCart = (productId) => {
    const updatedCart = cartItems.filter((item) => item.productID !== productId);
    setCartItems(updatedCart);
    localStorage.setItem('cart', JSON.stringify(updatedCart));
  };

  const updateQuantity = (productId, newQuantity) => {
    const updatedCart = cartItems.map((item) =>
      item.productID === productId ? { ...item, quantity: newQuantity } : item
    );
    setCartItems(updatedCart);
    localStorage.setItem('cart', JSON.stringify(updatedCart));
  };

  const calculateTotalItems = () => {
    return cartItems.reduce((total, item) => total + item.quantity, 0);
  };

  const handleConfirmOrder = () => {
    setIsConfirmationOpen(true);
  };

const proceedWithOrder = async () => {
    try {
    const orders = cartItems.map(item => {
        return {
          productID: item.productID,
          orderQty: item.quantity,
          email: localStorage.getItem('email'),
        };
      });

      console.log(localStorage.getItem('email'));
  
      const response = await axios.post('http://localhost:4000/api/orders', orders);
  
      if (response.status == 201) {
        localStorage.removeItem('cart');
        setCartItems([]);
        setIsConfirmationOpen(false);
        alert('Order placed successfully!');
      } else {
        throw new Error('Failed to place order.');
      }
    } catch (error) {
      console.error('Error placing order:', error);
      alert('Failed to place order. Please try again later.');
    }
  };
  

  return (
    <div>
      {cartItems.length > 0 ? (
        <div>
          <ul>
            {cartItems.map((item) => (
              <li key={item.productID}>
                {item.productName} - {item.productDesc} - Quantity: {item.quantity}
                <button onClick={() => removeFromCart(item.productID)}>Remove</button>
                <input
                  type="number"
                  value={item.quantity}
                  onChange={(e) => updateQuantity(item.productID, parseInt(e.target.value))}
                  min="1"
                />
              </li>
            ))}
          </ul>
          <p>Total Items: {calculateTotalItems()}</p>
          <button onClick={handleConfirmOrder}>Confirm Order</button>
          {isConfirmationOpen && (
            <div className="modal">
              <div className="modal-content">
                <p>Are you sure you want to proceed with the order?</p>
                <div className="modal-buttons">
                  <button onClick={proceedWithOrder}>Yes</button>
                  <button onClick={() => setIsConfirmationOpen(false)}>No</button>
                </div>
              </div>
            </div>
          )}
        </div>
      ) : (
        <p>Your cart is empty.</p>
      )}
    </div>
  );
};

export default Cart;