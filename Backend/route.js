import { placeOrder, removeOrder, getOrders, salesReport, updateOrder } from './controller/OrderController.js';
import { getProducts, addProduct, updateProductQuantity } from './controller/ProductController.js';
import { registerUser, loginUser, getUsers, deleteUser } from './controller/UserController.js';

export default function registerRoutes(app) {
  app.post('/api/register', registerUser);
  app.post('/api/login', loginUser);
  app.get('/api/users', getUsers);
  app.get('/api/products', getProducts);
  app.post('/api/products', addProduct);
  app.put('/api/products/:id', updateProductQuantity);
  app.post('/api/orders', placeOrder);
  app.get('/api/orders', getOrders);
  app.delete('/api/orders/:transactionID', removeOrder);
  app.put('/api/orders/:transactionID', updateOrder);
  app.get('/api/sales-report', salesReport);
  app.delete('/api/users/:email', deleteUser);

}