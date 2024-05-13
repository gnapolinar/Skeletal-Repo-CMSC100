import mongoose from 'mongoose';

const productSchema = new mongoose.Schema({
    productID: { type: String, required: true },
    productName: { type: String, required: true },
    productDesc: { type: String, required: true },
    productType: { type: Number, required: true },
    productPrice: { type: Number, required: true},
    productQty: { type: Number, required: true },
}, { collection: 'Products' });

const Product = mongoose.model('Product', productSchema);

export default Product;