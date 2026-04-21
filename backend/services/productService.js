const productRepository = require("../repositories/productRepository");

const createProduct = (data, userId) => {
  return productRepository.createProduct({
    ...data,
    user: userId
  });
};

const getProducts = (queryParams) => {
  return productRepository.getAllProducts(queryParams);
};

const getProductById = (id) => {
  return productRepository.getProductById(id);
};

const updateProduct = (id, data) => {
  return productRepository.updateProduct(id, data);
};

const deleteProduct = (id) => {
  return productRepository.deleteProduct(id);
};

module.exports = {
  createProduct,
  getProducts,
  getProductById,
  updateProduct,
  deleteProduct
};