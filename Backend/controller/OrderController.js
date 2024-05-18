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
            const { productID, orderQty, email, productName } = item;
            if (!productID || !orderQty || !email || !productName) {
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
                productName,
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

export const updateOrder = async (req, res) => {
    const { transactionID } = req.params;
    const { orderStatus } = req.body;

    try {
        const updatedOrder = await Order.findOneAndUpdate(
        { transactionID },
        { $set: { orderStatus } },
        { new: true }
        );

        if (!updatedOrder) {
        return res.status(404).json({ error: 'Order not found' });
        }

        res.json(updatedOrder);
    } catch (err) {
        console.error('Error updating order:', err);
        res.status(500).json({ error: 'Failed to update order' });
    }
}
// Sales report route
export const salesReport = async (req, res) => {
    try {
        const orders = await Order.find({ orderStatus: 2 }); // Delivered orders
        const weeklyReport = generateSalesReport(orders, 'week');
        const monthlyReport = generateSalesReport(orders, 'month');
        const annualReport = generateSalesReport(orders, 'year');
        res.json({ weeklyReport, monthlyReport, annualReport });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const generateSalesReport = (orders, period) => {
    const report = orders.reduce((acc, order) => {
        const date = new Date(order.dateOrdered);
        let periodKey;

        if (period === 'week') {
            const weekNumber = getWeekOfMonth(date);
            periodKey = `w${weekNumber}-${date.getFullYear()}-${(date.getMonth() + 1).toString().padStart(2, '0')}`;
        } else if (period === 'month') {
            periodKey = `${date.getFullYear()}-${(date.getMonth() + 1).toString().padStart(2, '0')}`;
        } else if (period === 'year') {
            periodKey = `${date.getFullYear()}`;
        }

        if (!acc[periodKey]) {
            acc[periodKey] = { totalSales: 0, products: {} };
        }

        acc[periodKey].totalSales += order.orderQty * order.orderPrice;
        if (!acc[periodKey].products[order.productID]) {
            acc[periodKey].products[order.productID] = {
                productName: order.productName,
                totalQtySold: 0,
                totalRevenue: 0
            };
        }

        acc[periodKey].products[order.productID].totalQtySold += order.orderQty;
        acc[periodKey].products[order.productID].totalRevenue += order.orderQty * order.orderPrice;

        return acc;
    }, {});

    return report;
};

const getWeekOfMonth = (date) => {
    const startOfMonth = new Date(date.getFullYear(), date.getMonth(), 1);
    const dayOfMonth = date.getDate();
    const dayOfWeek = startOfMonth.getDay();
    return Math.ceil((dayOfMonth + dayOfWeek) / 7);
};
