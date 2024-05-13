import React, { useState } from 'react';

const ProductListing = ({ products = [], onAddProduct, onDeleteProduct }) => {
  const [formData, setFormData] = useState({
    productName: '',
    productType: '',
    productPrice: '',
    productDescription: '',
    productQuantity: '',
    editIndex: null,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleAddProduct = () => {
    if (
      !formData.productName ||
      !formData.productType ||
      !formData.productPrice ||
      !formData.productDescription ||
      !formData.productQuantity
    ) {
      alert('Please fill all fields');
      return;
    }

    const newProduct = {
      productName: formData.productName,
      productType: formData.productType,
      productPrice: formData.productPrice,
      productDescription: formData.productDescription,
      productQuantity: formData.productQuantity,
    };

    onAddProduct(newProduct);

    setFormData({
      productName: '',
      productType: '',
      productPrice: '',
      productDescription: '',
      productQuantity: '',
      editIndex: null,
    });
  };

  const handleEditProduct = (index) => {
    const productToEdit = products[index];
    setFormData({
      ...productToEdit,
      editIndex: index,
    });
  };

  return (
    <div>
      <h2>Product Listing</h2>
      <ul>
        {products.map((product, index) => (
          <li key={index}>
            <div>
              <strong>Name: </strong> {product.productName}
            </div>
            <div>
              <strong>Type: </strong> {product.productType}
            </div>
            <div>
              <strong>Price: </strong> {product.productPrice}
            </div>
            <div>
              <strong>Description: </strong> {product.productDescription}
            </div>
            <div>
              <strong>Quantity: </strong> {product.productQuantity}
            </div>
            <div>
              <button onClick={() => onDeleteProduct(index)}>Delete</button>
              <button onClick={() => handleEditProduct(index)}>Edit</button>
            </div>
          </li>
        ))}
      </ul>

      <h3>{formData.editIndex !== null ? 'Edit Product' : 'Add New Product'}</h3>
      <input type="text" name="productName" placeholder="Product Name" value={formData.productName} onChange={handleChange} />
      <input type="text" name="productType" placeholder="Product Type" value={formData.productType} onChange={handleChange} />
      <input type="number" name="productPrice" placeholder="Product Price" value={formData.productPrice} onChange={handleChange} />
      <input type="text" name="productDescription" placeholder="Product Description" value={formData.productDescription} onChange={handleChange} />
      <input type="number" name="productQuantity" placeholder="Product Quantity" value={formData.productQuantity} onChange={handleChange} />
      <button onClick={handleAddProduct}>{formData.editIndex !== null ? 'Update Product' : 'Add Product'}</button>
    </div>
  );
};

export default ProductListing;
