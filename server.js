import express from 'express';
import router from './router.js';

const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

router(app);

// starts the server
app.listen(3000,() => {
    console.log('Server started at port 3000');
});