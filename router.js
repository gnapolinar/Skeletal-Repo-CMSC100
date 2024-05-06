// imports endpoints from controller.js
import { registerUser, loginUser, startSession, getUsers, getProducts } from './controller.js';

// routes
const router = (app) =>{
    app.post('/register', registerUser);
    app.post('/login', loginUser);
    app.get('/start-session', startSession);
    app.get('/get-users', getUsers);
    app.get('/get-products', getProducts);
}

export default router;
