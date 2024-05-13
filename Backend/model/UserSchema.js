import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
    firstName: { type: String, required: true },
    middleName: { type: String, sparse: true },
    lastName: { type: String, required: true },
    userType: { type: String },
    email: { type: String, required: true },
    password: { type: String, required: true },
}, { collection: 'Users' });

const User = mongoose.model('User', userSchema);

export default User;