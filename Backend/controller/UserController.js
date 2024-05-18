import User from '../model/UserSchema.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { v4 as uuidv4 } from 'uuid';

const secretKey = uuidv4();

export const registerUser = async (req, res) => {
  try {
    const { firstName, middleName, lastName, email, password, isMerchant } = req.body;
    const hashedPassword = isMerchant ? password : await bcrypt.hash(password, 10);
    const userExists = await User.findOne({ email: req.body.email });
    if (userExists) {
      return res.json({ message: 'User already exists.' });
    } else {
      const newUser = new User({ firstName, middleName, lastName, userType: isMerchant ? 'merchant' : 'customer', email, password: hashedPassword });
      await newUser.save();
      res.status(201).json({ message: 'User registered successfully.' });
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Error signing up.' });
  }
};

export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    let isPasswordValid = false;

    // Check if the user is a customer, then compare hashed password
    if (user.userType === 'customer') {
      isPasswordValid = await bcrypt.compare(password, user.password);
    } else {
      // For merchants or admins, directly compare the password
      isPasswordValid = password === user.password;
    }

    if (!isPasswordValid) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    const token = jwt.sign({ userId: user._id, userType: user.userType }, secretKey, { expiresIn: '1h' });
    res.json({ message: 'Login successful', token, userType: user.userType });
  } catch (err) {
    console.error('Error logging in:', err);
    res.status(500).json({ message: 'Error logging in' });
  }
};

export const getUsers = async (req, res) => {
  try {
    const users = await User.find({});
    console.log('Users:', users);
    res.json(users);
  } catch (err) {
    console.error('Error getting users:', err);
    res.json({ message: 'Server Error' });
  }
};


export const deleteUser = async (req, res) => {
  try {
    const { email } = req.params.email;

    // Find the user by email
    const user = await User.findOne({ email });

    // If user not found, return 404
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Delete the user
    await User.deleteOne({ email });

    res.json({ message: 'User deleted successfully' });
  } catch (err) {
    console.error('Error deleting user:', err);
    res.status(500).json({ message: 'Error deleting user' });
  }
};

