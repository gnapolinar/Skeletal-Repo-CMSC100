/* eslint-disable no-unused-vars */
import User from '../model/UserSchema.js'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import { v4 as uuidv4 } from 'uuid'

const secretKey = uuidv4()

export const registerUser = async (req, res) => {
    try {
      const { firstName, middleName, lastName, email, password } = req.body
      const hashedPassword = await bcrypt.hash(password, 10)
      const userExists = await User.findOne({ email: req.body.email })
      if (userExists) {
        return res.json({ message: 'User already exists.' })
      } else {
        const newUser = new User({ firstName, middleName, lastName, userType: 'customer', email, password: hashedPassword })
        await newUser.save()
        res.status(201).json({ message: 'User registered successfully.' })
      }
    } catch (err) {
      console.error(err)
      res.status(500).json({ message: 'Error signing up.' })
    }
  }
  
  
export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body
    const user = await User.findOne({ email })
    if (!user) {
      return res.status(401).json({ error: 'Invalid credentials' })
    }
    const isPasswordValid = await bcrypt.compare(password, user.password)
    if (!isPasswordValid) {
      return res.status(401).json({ error: 'Invalid credentials' })
    }
    const token = jwt.sign({ userId: user._id }, secretKey, { expiresIn: '1hr' })
    res.json({ message: 'Login successful' })
  } catch (err) {
      res.status(500).json({ message: 'Error logging in' })
    }
}
  
export const getUsers = async (req, res) => {
    try {
        const users = await User.find({})
        console.log('Users:', users)
        res.json(users)
    } catch (err) {
        console.error('Error getting users:', err)
        res.json({ message: 'Server Error' })
    }
}