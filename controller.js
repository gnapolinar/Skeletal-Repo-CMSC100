import mongoose from 'mongoose';
await mongoose.connect("mongodb://127.0.0.1:27017/FarmToTableDatabase", {useNewUrlParser: true, useUnifiedTopology: true});

// CREATE Mongoose models based on given format, save to respective collections
// User schema
const userSchema = new mongoose.Schema({
    firstName: String,
    lastName: String,
    userType: String,
    email: String,
    password: String,
}, { collection: 'Users' });
  
// Product schema
const productSchema = new mongoose.Schema({
    productID: Number,
    productName: String,
    productDesc: String,
    productType: Number,
    productQty: Number,
    productPrice: Number,
}, { collection: 'Products' });
  
// Order schema
const orderSchema = new mongoose.Schema({
    transactionID: String,
    productID: [Number], // reference to product
    orderQty: [Number], // upon confirmation, will be decreased from product qty
    orderStatus: Number, // 0-Pending, 1-Completed, 2-Canceled
    email: String, // reference to user
    dateOrdered: {
        type: Date,
        default: Date.now // timestamp of when the order was created
    }
}, { collection: 'Orders' });
  
// Creating the models
const User = mongoose.model('User', userSchema);
const Product = mongoose.model('Product', productSchema);
const Order = mongoose.model('Order', orderSchema);

// POST registers user
export const registerUser = async (req, res) => {
    const userExists = await User.findOne({ email: req.body.email });
    if (userExists) {  // checks if user already exists
      console.log('User already exists.');
    } else {  // if not, a User object is created
      // setting up user credentials
      const user = {
        firstName: req.body.fname,
        lastName: req.body.lname,
        userType: 'user',
        email: req.body.email,
        password: req.body.password,
      }
  
      try {
        const newUser = await User.insertMany(user);  // save
        console.log(newUser);
        res.send('Successfully registered.');
      } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server Error' });
      }
    }
};

// POST logins user
export const loginUser = async (req, res) => {
    // checks if user email is in the database
    const userExists = await User.findOne({ email: req.body.email });
  
    if (userExists) {
      if (req.body.password === userExists.password) { // checks if passwords match
        //req.session.fname = userExists.firstName;
        //req.session.email = userExists.email;
        res.json({ success: true });
      } else {
        res.json({ success: false });
      }
    } else {
      res.json({ success: false });
    }
}

// GET fetches all users from the Users collection
export const getUsers = async (req, res) => {
    try {
      const users = await User.find({}); // gets all items from database
      res.json(users);
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: 'Server Error' });
    }
};

// GET fetches all products from the Products collection
export const getProducts = async (req, res) => {
    try {
      const products = await Product.find({}); // gets all items from database
      res.json(products);
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: 'Server Error' });
    }
};

// counts the number of transactions (to be used for creating Order object as transactionID)
const transactionCount = async () => {
    try {
        const count = await Order.countDocuments({});
        return count;
    } catch (error) {
        console.error('Error:', error);
        return null;
    }
}

// POST saves items from cart into Orders collection
export const saveOrder = async (req, res) => {
    try {
      const { cartItems, email } = req.body;  // product objects in cart are passed 
      let ids = [];
      let qtys = [];
      for(var i=0; i<cartItems.length; i++) {
        ids[i] = cartItems[i].id;
        qtys[i] = cartItems[i].qty;
      }
      const count = await transactionCount();
      const order = {
        transactionID: count+1,
        productID: ids, 
        orderQty: qtys, // upon confirmation, will be decreased from product qty
        orderStatus: 0, // 0-Pending, 1-Completed, 2-Canceled
        email: email, // reference to user
        dateOrdered: new Date()
      };
  
      try {
        const newOrder = await Order.insertMany(order);  // save
        console.log(newOrder);
        for(var i=0;i<ids.length;i++) {
          const product = await Product.find({productID: ids[i]});
          const updatedqty = product[0].productQty - qtys[i];
          const updateproduct = await Product.findOneAndUpdate(
            {productID: ids[i]}, {$set: {productQty: updatedqty}}  // decreases product qty
          ); 
        }
        res.send('Order successfully placed.');
      } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server Error' });
      }
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: 'Server Error' });
    }
};

// GET fetches all user's orders from the Orders collection
export const getOrdersbyUser = async (req, res) => {
    try {
      const orders = await Order.find({email: req.session.email}); // gets all orders of the user
      res.json(orders);
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: 'Server Error' });
    }
};

// POST cancels an order object from the Orders collection
export const cancelOrder = async (req, res) => {
    try {
      const orderId = req.params.orderId;
      Order.updateOne({ transactionID: orderId }, { $set: { orderStatus: 0 } })
      .then(updatedOrder => {
          res.json(updatedOrder);
      })
      .catch(error => {
          res.status(500).json({ error: 'Failed to cancel the order' });
      });
  
      res.json({ message: 'Order successfully cancelled' });
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: 'Server Error' });
    }
};
