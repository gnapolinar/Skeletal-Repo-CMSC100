import Order from '../model/OrderSchema.js';
import Product from '../model/ProductSchema.js'
import { v4 as uuidv4 } from 'uuid';

export const placeOrder = async (req, res) => {
    try {
        console.log('Request Body:', req.body); // debug

        if (!Array.isArray(req.body) || req.body.length === 0) {
            return res.status(400).json({ message: 'Invalid request body.' });
        }

        const saveTasks = [];

        for (const item of req.body) {
            const { productID, orderQty, email } = item;
            if (!productID || !orderQty || !email) {
                return res.status(400).json({ message: 'Missing required fields for an item.' });
            }

            const product = await Product.findOne({ productID });
            if (!product) {
                return res.status(404).json({ message: `Product with ID ${productID} not found.` });
            }

            const orderPrice = product.productPrice * orderQty;
            const newOrder = new Order({
                transactionID: uuidv4(),
                productID,
                orderQty,
                orderStatus: 0,
                email,
                orderPrice,
            });
            
            console.log('New Order: ', newOrder)
            const saveTask = newOrder.save();
            saveTasks.push(saveTask);
        }

        for (const saveTask of saveTasks) {
            await saveTask;
        }

        console.log('Orders placed successfully');
        res.status(201).json({ message: 'Orders placed successfully.' });
    } catch (err) {
        console.error('Error placing orders:', err);
        res.status(500).json({ message: 'Server Error' });
    }
};

export const removeOrder = async (req, res) => {
    try {
        const transactionID = req.params.transactionID;
        await Order.findOneAndDelete({ transactionID });
        console.log('Order removed successfully:', transactionID);
        res.json({ message: 'Order removed successfully.' });
    } catch (err) {
        console.error('Error removing order:', err);
        res.status(500).json({ message: 'Server Error' });
    }
};

export const getOrders = async (req, res) => {
    try {
        const orders = await Order.find();
        console.log('All orders retrieved successfully:', orders);
        res.json(orders);
    } catch (err) {
        console.error('Error getting orders:', err);
        res.status(500).json({ message: 'Server Error' });
    }
};