import { useState, useEffect } from 'react';
import axios from 'axios';

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [groupedOrders, setGroupedOrders] = useState({});
  const [products, setProducts] = useState({});
  const userEmail = localStorage.getItem('email');

  useEffect(() => {
    if (userEmail) {
      axios.get(`http://localhost:4000/api/orders?email=${userEmail}`)
        .then((response) => {
          console.log(response.data);
          setOrders(response.data);
        })
        .catch((error) => {
          console.error(error);
        });
    }
  }, [userEmail]);

  useEffect(() => {
    axios.get('http://localhost:4000/api/products')
      .then((response) => {
        const productMap = {};
        response.data.forEach(product => {
          productMap[product.productID] = product.productName;
        });
        setProducts(productMap);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  useEffect(() => {
    const grouped = {};
    orders.forEach(order => {
      const datetime = new Date(order.dateOrdered);
      const key = datetime.toLocaleString('en-US');
      if (!grouped[key]) {
        grouped[key] = [];
      }
      grouped[key].push(order);
    });
    setGroupedOrders(grouped);
  }, [orders]);

  const getTotalQuantity = (orders) => {
    return orders.reduce((total, order) => total + order.orderQty, 0);
  };

  const getTotalPrice = (orders) => {
    return orders.reduce((total, order) => total + order.orderPrice, 0);
  };

  const renderOrders = () => {
    return Object.entries(groupedOrders).map(([datetime, orders]) => {
      const filteredOrders = orders.filter(order => order.email === userEmail);
      
      if (filteredOrders.length === 0) {
        return null;
      }
  
      return (
        <details key={datetime}>
          <summary>{datetime} - Total Quantity: {getTotalQuantity(filteredOrders)}, Total Price: {getTotalPrice(filteredOrders)}</summary>
          <ul>
            {filteredOrders.map(order => (
              <li key={order.transactionID}>
                Product: {products[order.productID]}, Quantity: {order.orderQty}, Price: {order.orderPrice}
              </li>
            ))}
          </ul>
        </details>
      );
    });
  };
  
  return (
    <div>
      <h1>Orders</h1>
      {renderOrders()}
    </div>
  );
};

export default Orders;
