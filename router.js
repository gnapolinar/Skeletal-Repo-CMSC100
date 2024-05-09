// imports endpoints from controller.js
import { registerUser, loginUser, getUsers, getProducts, saveOrder, getOrdersbyUser, cancelOrder } from './controller.js';

// routes
const router = (app) =>{
    app.post('/register', registerUser);
    app.post('/login', loginUser);
    app.get('/get-users', getUsers);
    app.get('/get-products', getProducts);
    app.post('/save-order', saveOrder);
    app.get('/get-orders-by-user', getOrdersbyUser);
    app.put('/cancel-order/:orderId', cancelOrder);
}

export default router;