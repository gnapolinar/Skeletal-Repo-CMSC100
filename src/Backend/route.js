import { placeOrder } from './controller/OrderController.js';
import { getProducts, addProduct, updateProductQuantity } from './controller/ProductController.js';
import { registerUser, loginUser, getUsers } from './controller/UserController.js';

export default function registerRoutes(app) {
  app.post('/api/register', registerUser);
  app.post('/api/login', loginUser);
  app.get('/api/users', getUsers);
  app.get('/api/products', getProducts);
  app.post('/api/products', addProduct);
  app.put('/api/products/:id', updateProductQuantity);
  app.post('/api/orders', placeOrder);
}