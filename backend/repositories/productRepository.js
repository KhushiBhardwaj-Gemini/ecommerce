const Product = require("../models/Product");

const createProduct = (data) => Product.create(data);

const getAllProducts = async ({ search, category, sort }) => {
  let query = {};

  // SEARCH
  if (search) {
    query.title = { $regex: search, $options: "i" };
  }

  //  CATEGORY
  if (category) {
    query.category = category;
  }

  let dbQuery = Product.find(query)
    .select("title price category image user")
    .populate("user", "name");

  // SORT
  if (sort === "low") dbQuery = dbQuery.sort({ price: 1 });
  if (sort === "high") dbQuery = dbQuery.sort({ price: -1 });

  return dbQuery;
};

const getProductById = (id) =>
  Product.findById(id).populate("user", "name email");

const updateProduct = (id, data) =>
  Product.findByIdAndUpdate(id, data, { new: true });

const deleteProduct = (id) =>
  Product.findByIdAndDelete(id);

module.exports = {
  createProduct,
  getAllProducts,
  getProductById,
  updateProduct,
  deleteProduct
};