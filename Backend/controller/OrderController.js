import Order from '../model/OrderSchema.js';
import { v4 as uuidv4 } from 'uuid';

export const placeOrder = async (req, res) => {
    try {
        console.log('Request Body:', req.body);

        const newOrder = new Order({
            transactnID: uuidv4(),
            productID: req.body.productID,
            orderQty: req.body.orderQty,
            orderStatus: 0,
            email: req.body.email,
        });
        await newOrder.save();
        console.log('Order placed successfully:', newOrder);
        res.status(201).json({ message: 'Order placed successfully.' });
    } catch (err) {
        console.error('Error placing order:', err);
        res.status(500).json({ message: 'Server Error' });
    }
};