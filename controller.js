// import statement
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
}, { collection: 'Products' });
  
// Order schema
const orderSchema = new mongoose.Schema({
    transactnID: String,
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
    if (userExists) {
      console.log('User already exists.');
    } else {
      // setting up user credentials
      const user = {
        firstName: req.body.fname,
        lastName: req.body.lname,
        userType: 'user',
        email: req.body.email,
        password: req.body.password,
      }
  
      try {
        const newUser = await User.insertMany(user);
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
        req.session.fname = userExists.firstName;
        req.session.email = userExists.email;
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
      const users = await User.find({}); //gets all items from database
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




